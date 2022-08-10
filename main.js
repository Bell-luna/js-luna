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

const guardaLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};
function recuperarLocal(clave) {
  return localStorage.getItem(clave);
}

/*
    price: el precio de la casa
    downPayment: el anticipo del prestamo
    term: el plazo del credito en años
*/
function calcularCredito(price, downPayment, term) {
  // Voy a comprobar que el precio este entre el MIN y el MAX
  if (price < MIN_PRICE) {
    swal("El precio tiene que ser mayor a " + MIN_PRICE);
    return;
  }
  if (price > MAX_PRICE) {
    swal("El precio tiene que ser menor a " + MAX_PRICE);
    return;
  }

  // Voy a dar error si el downPayment es mayor al precio
  if (price < downPayment) {
    swal("El downPayment tiene que ser menor al precio");
    return;
  }
  // Voy a comprobar que el downpayment respete el minimo ratio
  if (downPayment / price < DOWNPAYMENT_RATIO) {
    swal(
      "El downpayment tiene que ser como minimo el " +
        DOWNPAYMENT_RATIO +
        " de " +
        price
    );
    return;
  }

  console.log("term", term);

  if (isNaN(term)) {
    swal("Elige un term");
    return;
  }

  // Voy a comprobar que el term este entre el MIN_TERM y MAX_TERM
  if (term < MIN_TERM) {
    swal("El term tiene que ser mayor a " + MIN_TERM);
    return;
  }
  if (term > MAX_TERM) {
    swal("El term tiene que ser menor a " + MAX_TERM);
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

  return {
    credito,
    monthlyPayment,
  };
}

// Casos de error
// alert("CASOS DE ERROR");
// calcularCredito(10, 20000);
// calcularCredito(999999999, 20000);
// calcularCredito(120000, 121000);
// calcularCredito(120000, 20);
// calcularCredito(120000, 20000, 0);
// calcularCredito(120000, 20000, 21);

// Caso de exito
// alert("CASO DE EXITO");
// calcularCredito(120000, 20000, 1);

const LS_CLAVE = "credito";

// DOM
const boton = document.getElementById("calcular");
boton.onclick = () => {
  console.log("Hiciste Click");

  // Obtenemos el valor de los input
  const anticipo = document.getElementById("anticipo").value;
  const precioPropiedad = document.getElementById("precioPropiedad").value;
  const plazo = document.getElementById("plazo").value;
  console.log(
    "anticipo",
    anticipo,
    "precioPropiedad",
    precioPropiedad,
    "plazo",
    plazo
  );

  // Calculamos el credito
  const calculo = calcularCredito(precioPropiedad, anticipo, plazo);
  console.log(calculo);

  // Escribimos en el DOM el resultado
  document.getElementById("resultadoCredito").innerHTML =
    "Credito: " + calculo.credito;
  document.getElementById("pagoMensual").innerHTML =
    "Pago Mensual: " + calculo.monthlyPayment;

  // Guardamos el resultado en LS
  guardaLocal(LS_CLAVE, JSON.stringify(calculo));
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("cargamos!");
  const calculo = JSON.parse(recuperarLocal(LS_CLAVE));

  if (calculo) {
    // Escribimos en el DOM el resultado
    document.getElementById("resultadoCredito").innerHTML =
      "Credito: " + calculo.credito;
    document.getElementById("pagoMensual").innerHTML =
      "Pago Mensual: " + calculo.monthlyPayment;
  }
});

// Sweet alert

swal("Queres crear un presupuesto?", {
  dangerMode: true,
  buttons: true,
});

// AJAX/FETCH

fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
  .then((response) => response.json())
  .then((dolares) => {
    const dolarOficial = dolares.find((dolar) => {
      if (dolar.casa.nombre === "Dolar Oficial") return true;
      return false;
    });
    console.log(dolarOficial);
    document.getElementById("dolar").innerHTML =
      "Dolar: " + dolarOficial.casa.venta;
  });
  
