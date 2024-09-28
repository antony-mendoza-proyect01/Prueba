export interface IUser {
    id: number;
    nombres: string;      // Longitud 50
    apellidos: string;    // Longitud 50
    fechaNacimiento: Date;
    email: string;        // Longitud 50
    numeroDocumento: number; // Longitud 7
    area: number;         // Longitud 2
    salario: number;      // Decimal – Longitud 10 con 2 decimales
    estado: 'Activo' | 'Inactivo'; // Activo por defecto
  }