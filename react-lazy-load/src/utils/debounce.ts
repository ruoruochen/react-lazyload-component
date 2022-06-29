export function debounce(callback: () => void, delay: number) {
  let timer: number | undefined | NodeJS.Timeout = undefined;
  return function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const context = this;
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      callback.call(context, args);
    }, delay);
  };
}
