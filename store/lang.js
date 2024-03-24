
export const state = () => ({
    t: null,
});

export const mutations = {
    setTranslate(state, translate) {
        state.t = translate
    },
};
