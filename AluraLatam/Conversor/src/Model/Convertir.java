package Model;

public class Convertir {
	public double tasa = 1;
	public double resultado = 0;
	public String tipo="pesitos";


	public Convertir(double numero, int indice) {
		switch (indice) {
		case 0:
			this.tasa = 0.054;
			this.tipo=" Dólares";
			break;
		case 1:
			this.tasa = 0.051;
			this.tipo=" Euros.";
			break;
		case 2:
			this.tasa = 0.045;
			this.tipo=" Libras.";
			break;
		case 3:
			this.tasa = 18.38;
			this.tipo=" Pesos.";
			break;
		case 4:
			this.tasa = 0.94;
			this.tipo=" Euros.";
			break;
		case 5:
			this.tasa = 0.83;
			this.tipo=" Libras.";
			break;
		case 6:
			this.tasa = 19.50;
			this.tipo=" Pesos.";
			break;
		case 7:
			this.tasa = 1.06;
			this.tipo=" Dólares.";
			break;
		case 8:
			this.tasa = 0.88;
			this.tipo=" Libras.";
			break;
		case 9:
			this.tasa = 22.17;
			this.tipo=" Pesos.";
			break;
		case 10:
			this.tasa = 1.21;
			this.tipo=" Dólares.";
			break;
		case 11:
			this.tasa = 1.14;
			this.tipo=" Euros.";
			break;
		case 12:
			this.tasa = 7.41;
			this.tipo=" Yens.";
			break;
		case 13:
			this.tasa = 71.63;
			this.tipo=" Wons.";
			break;
		case 14:
			this.tasa = 0.13;
			this.tipo=" Pesos.";
			break;
		case 15:
			this.tasa = 0.014;
			this.tipo=" Pesos.";
			break;
		default:
			this.tasa = 1;
			this.tipo="pesitos";
			break;
		}
		this.resultado = Math.round((numero * tasa)*100)/100d;
		//Math.round(precioFinal * 100) / 100d

		System.out.println(this.resultado);
	}

	public String getTipo() {
		return tipo;
	}

	public double getTasa() {
		return tasa;
	}

	public double getResultado() {
		return resultado;
	}

}
