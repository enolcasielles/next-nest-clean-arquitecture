export const unwrapEither = ({ left, right }) => {
    if (right !== undefined && left !== undefined) {
        throw new Error(`Received both left and right values at runtime when opening an Either\nLeft: ${JSON.stringify(left)}\nRight: ${JSON.stringify(right)}`);
    }
    if (left !== undefined) {
        return left;
    }
    if (right !== undefined) {
        return right;
    }
    throw new Error('Received no left or right values at runtime when opening Either');
};
export const isLeft = (e) => {
    return e.left !== undefined;
};
export const isRight = (e) => {
    return e.right !== undefined;
};
export const makeLeft = (value) => ({ left: value });
export const makeRight = (value) => ({ right: value });
export * from './custom-error';
//# sourceMappingURL=index.js.map