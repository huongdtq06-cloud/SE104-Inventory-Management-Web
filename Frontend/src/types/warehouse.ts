export const WarehouseStatus = {
  LOW_STOCK: "Low Stock",
  SHIFT_VACANCY: "Shift Vacancy",
  STABLE_OPERATIONS: "Stable Operations",
  DEFECTIVE_BATCH: "Defective Batch",
} as const;

export type WarehouseStatusType = typeof WarehouseStatus[keyof typeof WarehouseStatus];

export interface Warehouse {
<<<<<<< HEAD:src/types/warehouse.ts
  warehouseId: string;
  name: string;
  address: string;
  lastUpdate: string;
  status: WarehouseStatusType;
  productCount: number;
=======
  warehouseId: number;
  name: string;
  location: string;
  lastUpdate?: string;
  status: WarehouseStatusType;
  productCount?: number;
  imageUrl?: string;
}
export interface FormCreateWarehouse {
  name: string;
  location: string; // fix viết nhầm l thành L
>>>>>>> origin/main:Frontend/src/types/warehouse.ts
  imageUrl?: string;
}

export interface Invitation {
  id: string;
<<<<<<< HEAD:src/types/warehouse.ts
  userId: string;
  ownerId: string;
  sendTime: string;
  warehouseId: string;
  warehouseName: string;
  address: string;
  requestedRole: "manager" | "staff";
  imageUrl?: string;
=======
  sendTime?: string;
  ownerId: string;
  warehouseId: string;
  warehouseName: string;
  Role: "manager" | "staff";
  imageUrl?: string;
}

export interface InvitationForm {
  InvitationId:string
>>>>>>> origin/main:Frontend/src/types/warehouse.ts
}