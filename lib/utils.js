import confetti from "canvas-confetti";

export const runStarsConffeti = () => {
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

export const formatPrice = (value) => {
  return Number.parseFloat(value).toFixed(2);
};

const LOCAL_STORAGE_CART = "mercury_cart";
export const getLocalStorageCart = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART) || "[]");

export const setLocalStorageCart = (cart) =>
  localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));

export const removeLocalStorageCart = () =>
  localStorage.removeItem(LOCAL_STORAGE_CART);
