/**
 * 基础 HTTP 相应报文
 */
export type ResponseProps<T> = {
  code: number;
  ok: boolean;
  msg: string | null;
  data: T;
};

/**
 * 聊天消息历史 HTTP 请求
 *
 * 该请求用于获取聊天历史记录，前端会发送一个 ChatHistoryRequestProps 对象给后端，
 * 后端会返回一个 ChatHistoryResponseProps 对象给前端。
 * 在请求中，前端需要指定 userNo 和 oldestSeqNo，
 * userNo 是用户的唯一标识，oldestSeqNo 是前端已经获取到的最老的消息的 seqNo。
 * 如果前端已拉取的消息为空，oldestSeqNo 可以设置为 null。
 *
 * 注：该协议仅适用于每个用户仅有一个会话的场景，如果用户可以同时进行多个会话，需要对协议进行调整。
 */
export type ChatHistoryRequestProps = {
  userNo: string

  /**
   * 最老的消息的 seqNo
   *
   * 如果前端已拉取的消息为空，oldestSeqNo 可以设置为 null。
   */
  oldestSeqNo: number | null

  /**
   * 每次拉取的问答消息回合的数量，即多少对问答。
   */
  size: number
};

/**
 * 聊天消息历史 HTTP 响应
 *
 * 该响应用于返回聊天历史记录，前端会发送一个 ChatHistoryRequestProps 对象给后端，
 * 后端会返回一个 ChatHistoryResponseProps 对象给前端。
 * 在响应中，后端会返回一个 conversationId 和一个 history 数组，
 * history 数组包含了多个 ChatMessageProps 对象，每个 ChatMessageProps 对象包含了一次问或答的信息。
 * conversationId 是会话的唯一标识，前端需要保存该标识，以便在后续的聊天中使用。
 * 如果 history 数组为空，表示前端已经获取到了所有的消息。
 */
export type ChatHistoryResponseProps = ResponseProps<{
  messages: ChatMessageProps[]
  conversationId: number
}>;

/**
 * 聊天消息 WebSocket 请求/响应
 *
 * 该协议用于前端与后端之间的通信，用于描述一次聊天问答的信息。
 * 一段完整的聊天会话由多个 ChatMessageProps 对象组成，每个 ChatMessageProps 对象包含了一次问或答的信息。
 * 在一次问答中，前端会先发送一个 ChatMessageProps 对象给后端，后端会返回一个或多个 ChatMessageProps 对象给前端。
 * 每个 ChatMessageProps 对象包含了多个 LayerProps 对象，每个 LayerProps 对象包含了一组格式化的信息。
 */
export type ChatMessageProps = {
  /**
   * 会话 ID
   *
   * 会话 ID 由后端生成，用于标识一次完整的会话。
   * 前端第一次获取聊天历史记录时，后端会返回一个会话 ID，前端需要保存该 ID，
   * 以便在后续的聊天中使用。
   * 会话 ID 会在一次完整的会话中一直保持不变。
   */
  conversationId: number

  /**
   * 消息序列号
   *
   * 消息序列号由前端生成，用于标识一次问答回合。
   * 前端发送消息时，需要生成一个消息序列号，后端返回消息时，会将消息序列号原样返回。
   * 消息序列号会在一次完整的会话中递增。
   */
  seqNo: number;

  source: "USER" | "ASSISTANT";
  context: {
    hook: {
      type: "FOCUS" | "SIGNAL_SOURCE"
      id: 3
    }
  } | null,
  language: "zh" | "en",
  text: string;
  layers: LayerProps[];

  /**
   * 是否还有更多的消息
   *
   * 如果后端返回多个 ChatMessageProps 对象，除最后一个 ChatMessageProps 对象外，
   * more 都设为为 true，表示后端还有更多的消息需要返回。
   */
  more: boolean,
}

/**
 * 聊天层块信息
 *
 * 在一次聊天问答回合中，AI 后端会推送多个 ChatMessageProps 对象给前端。
 * 每个 ChatMessageProps 包含了 layers 属性，layers 属性是一个数组，数组中的每个元素都是一个层块信息。
 * 层块信息用于描述一组格式化的信息，例如日志、错误、热门币、热门信号源、比特币趋势预测等。
 * 前端需要根据层块信息的 layer 属性来决定如何展示这些信息。
 */
export type LayerProps = {
  layer: "LOG" | "ERROR" | "HOT_COINS" | "HOT_SOURCES" | "PREDICTION"
}

/**
 * 日志层块信息
 *
 * AI 后端在尝试回答用户问题时会多次调用工具以查询、分析、预测等，这些调用的记录信息会通过此层块返回给前端。
 * 前端可以显示在回答气泡的下方，以便用户了解 AI 后端的工作情况。
 */
export type LogLayerProps = LayerProps & {
  layer: "LOG"
  toolName: string
  log: string
}

/**
 * 错误层块信息
 *
 * AI 后端在尝试回答用户问题时可能会遇到错误，这些错误信息会通过此层块返回给前端。
 */
export type ErrorProps = LayerProps & {
  layer: "ERROR"
  code: number
  error: string
}

/**
 * 热门币层块信息
 */
export type HotCoinsLayerProps = LayerProps & {
  layer: "HOT_COINS"
  title: string
  data: {
    coins: CoinProps[]
  }
}

/**
 * 热门信号源层块信息
 */
export type HotSourcesLayerProps = LayerProps & {
  layer: "HOT_SOURCES"
  title: string
  data: {
    sources: SourceProps[]
  }
}

/**
 * 比特币趋势预测层块信息
 */
export type PredictionLayerProps = LayerProps & {
  layer: "PREDICTION"
  title: string
  data: {
    coin: CoinProps
    /**
     * 预测结果，即币价涨跌百分比
     */
    returns: number
    advantages: string[]
    disadvantages: string[]
    conclusion: string
  }
}

/**
 * 比特币
 */
export type CoinProps = {
  id: number
  name: string
  symbol: string

  /**
   * 币的 logo url
   */
  logo: string
  description: string
  slug: string

  /**
   * 市值
   */
  marketCap: number

  /**
   * 流通供应量
   */
  circulatingSupply: number
}

/**
 * 信号源
 */
export type SourceProps = {
  id: number
  name: string

  /**
   * 信号源 logo url
   */
  logo: string

  /**
   * 信号源官网链接
   */
  link: string
}