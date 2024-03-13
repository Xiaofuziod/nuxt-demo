const message = {
  "source": "USER" | "ASSISTANT",
  "context": {
    // 该字段仅USER下会存在，引用的用户所在页面上下文
    "hook": {
      "type": "FOCUS" | "SINGAL_SOURCE",
      "id": 3
    }
  },
  language: "zh" | "en",
  "text": "文字内容",
}
