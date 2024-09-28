export interface IArea {
    id: number;
    codigo: number;       // Longitud 2
    nombre: string;       // Longitud 50
    lider: string;        // Longitud 50
    estado: 'Activo' | 'Inactivo'; // Activo por defecto
  }