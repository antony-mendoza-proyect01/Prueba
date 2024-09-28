export interface IArea {
    id: number;
    codigo: number;       // Longitud 2
    nombre: string;       // Longitud 50
    lider: number;        // Longitud 7
    estado: 'Activo' | 'Inactivo'; // Activo por defecto
  }