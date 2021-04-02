type SubscriptionCallback = {
  (): void;
};

const subscriptions: SubscriptionCallback[] = [];

export function addSubscription(callback: SubscriptionCallback) {
  subscriptions.push(callback);
  setTimeout(callback, 0);
}

export function updateSubscriptions() {
  subscriptions.forEach((callback) => callback());
}
