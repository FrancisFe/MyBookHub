"use server";
import { Order, OrderDto } from "@/features/types/order";
import { getApiUrl } from "@/features/utils/baseURL";
import { getAuthToken } from "@/lib/auth";

const url = getApiUrl('/api/order');
  
/**
 * Obtener todas las órdenes del usuario actual (mis órdenes)
 */
export const getMyOrders = async (): Promise<OrderDto[]> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/user/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 }, // No cachear órdenes
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

/**
 * Obtener una orden específica por ID
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

/**
 * Obtener alquileres activos
 */
export const getActiveRentals = async (): Promise<OrderDto[]> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/activerentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 },
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

/**
 * Obtener alquileres vencidos
 */
export const getOverdueRentals = async (): Promise<OrderDto[]> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/overduerentals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 0 },
  });
  
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

/**
 * Cancelar una orden
 */
export const cancelOrder = async (orderId: string): Promise<boolean> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.ok;
};

/**
 * Marcar orden como devuelta (para alquileres)
 */
export const markAsReturned = async (orderId: string): Promise<boolean> => {
  const token = await getAuthToken();
  const response = await fetch(`${url}/${orderId}/mark-returned`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.ok;
};
