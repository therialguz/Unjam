let currentCooperation: [cooperationId: Symbol, startedAt: number] | null =
  null;

type CooperateStatus = {
  /**
   * The number of times the cooperation has been started.
   */
  numberOfCooperations: number;
};

/**
 * @internal - This type is not yet stable and might change.
 */
export interface CooperatePromise<T> extends Promise<T> {
  _status: CooperateStatus;
}

let currentId = 0;

export const cooperate = <T = void>(
  callback: (handoff: () => Promise<void>) => T | Promise<T>
): Promise<T> => {
  const status: CooperateStatus = {
    numberOfCooperations: 0,
  };

  const cooperationId = Symbol(currentId++);

  // Create a promise that resolves when the cooperation is complete
  const promise = new Promise<T>(async (resolve, reject) => {
    const handoff = () => {
      const currentCooperationId = currentCooperation![0];
      currentCooperation = null;

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          queueMicrotask(() => {
            currentCooperation = [currentCooperationId, Date.now()];
            resolve();
          });
          status.numberOfCooperations++;
        }, 0);
      });
    };

    let result: T;
    try {
      if (currentCooperation === null) {
        currentCooperation = [cooperationId, Date.now()];
      }
      status.numberOfCooperations++;
      result = await callback(handoff as () => Promise<void>);
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      stopCooperation(cooperationId);
    }
  });

  // Attach the cooperative status to the promise
  (promise as CooperatePromise<T>)._status = status;

  return promise;
};

/**
 *
 * @param symbol -
 * @returns
 */
const stopCooperation = (symbol: Symbol | null) => {
  if (currentCooperation === null) {
    // No cooperation in progress
    throw new Error("No cooperation in progress.");
  }

  if (currentCooperation[0] !== symbol) {
    // The current caller is not the one who started the cooperation
    return;
  }

  currentCooperation = null;
};

export const getCurrentCooperation = () => {
  if (currentCooperation === null) {
    throw new Error("No cooperation in progress.");
  }

  return currentCooperation;
};
