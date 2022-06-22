const MIN_PRICE = 100000;
const MAX_PRICE = 2000000;
const DOWNPAYMENT_RATIO = 0.1; // 10%
const MIN_TERM = 1;
const MAX_TERM = 20;

const yearsToMonths = (years) => {
  const months = years * 12;
  return months;
};

function calculaValorCredito(price, downPayment) {
  return price - downPayment;
}

/*
    price: el precio de la casa
    downPayment: el anticipo del prestamo
    term: el plazo del credito en años
*/
function calcularCredito(price, downPayment, term) {
  console.log("price", price, "downPayment", downPayment, "term", term);

  // Voy a comprobar que el precio este entre el MIN y el MAX
  if (price < MIN_PRICE) {
    console.log("El precio tiene que ser mayor a " + MIN_PRICE);
    return;
  }
  if (price > MAX_PRICE) {
    console.log("El precio tiene que ser menor a " + MAX_PRICE);
    return;
  }

  // Voy a dar error si el downPayment es mayor al precio
  if (price < downPayment) {
    console.log("El downPayment tiene que ser menor al precio");
    return;
  }
  // Voy a comprobar que el downpayment respete el minimo ratio
  if (downPayment / price < DOWNPAYMENT_RATIO) {
    console.log(
      "El downpayment tiene que ser como minimo el " +
        DOWNPAYMENT_RATIO +
        " de " +
        price
    );
    return;
  }

  // Voy a comprobar que el term este entre el MIN_TERM y MAX_TERM
  if (term < MIN_TERM) {
    console.log("El term tiene que ser mayor a " + MIN_TERM);
    return;
  }
  if (term > MAX_TERM) {
    console.log("El term tiene que ser menor a " + MAX_TERM);
    return;
  }

  // Calcular el credito -> el credito es la diferencia entre
  // el downPayment y el precio
  const credito = calculaValorCredito(price, downPayment);

  // Calcular el pago mensual del credito
  // ej: 20 años -> 20 * 12 = 240 meses
  // credito 1000 / 240 = 4,16$/mes

  // credito: 10.000
  // term: 2 -> termMonth: 2 * 12 = 24
  // 10.000 / 24 = 416
  const termMonth = yearsToMonths(term);
  const monthlyPayment = credito / termMonth;

  console.log(
    "OK el credito es " +
      credito +
      " tenes que pagar " +
      monthlyPayment +
      " por mes"
  );
}

// Casos de error
console.log("CASOS DE ERROR");
calcularCredito(10, 20000);
calcularCredito(999999999, 20000);
calcularCredito(120000, 121000);
calcularCredito(120000, 20);
calcularCredito(120000, 20000, 0);
calcularCredito(120000, 20000, 21);

// Caso de exito
console.log("CASO DE EXITO");
calcularCredito(120000, 20000, 1);
