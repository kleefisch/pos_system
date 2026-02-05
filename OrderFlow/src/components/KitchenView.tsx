import { LogOut, Clock, ChefHat, CheckCircle } from 'lucide-react';
import { OrderFlowLogo } from './OrderFlowLogo';
import type { Table, Order, OrderStatus } from '../types';

interface KitchenViewProps {
  tables: Table[];
  onUpdateTables: (tables: Table[]) => void;
  onLogout: () => void;
}

export function KitchenView({ tables, onUpdateTables, onLogout }: KitchenViewProps) {
  const handleUpdateOrderStatus = (tableId: string, orderId: string, newStatus: OrderStatus) => {
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          orders: table.orders.map(order => {
            if (order.id === orderId) {
              const statusUpdate: Partial<Order> = { status: newStatus };
              
              if (newStatus === 'preparing') {
                statusUpdate.preparingAt = new Date();
              } else if (newStatus === 'done') {
                statusUpdate.doneAt = new Date();
              } else if (newStatus === 'delivered') {
                statusUpdate.deliveredAt = new Date();
              }
              
              return { ...order, ...statusUpdate };
            }
            return order;
          })
        };
      }
      return table;
    });
    
    onUpdateTables(updatedTables);
  };

  // Get all orders that need kitchen attention (pending or preparing)
  const activeOrders: Array<{ table: Table; order: Order }> = [];
  const doneOrders: Array<{ table: Table; order: Order }> = [];
  
  tables.forEach(table => {
    table.orders.forEach(order => {
      if (order.status === 'pending' || order.status === 'preparing') {
        activeOrders.push({ table, order });
      } else if (order.status === 'done') {
        doneOrders.push({ table, order });
      }
    });
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'border-red-300 bg-red-50';
      case 'preparing':
        return 'border-yellow-300 bg-yellow-50';
      case 'done':
        return 'border-green-300 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const formatTime = (date?: Date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <OrderFlowLogo size="md" />
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-orange-100 px-3 py-2 rounded-lg">
              <ChefHat className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">Kitchen</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-orange-600">
              <div className="text-2xl font-bold text-gray-800">{activeOrders.filter(o => o.order.status === 'pending').length}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-yellow-600">
              <div className="text-2xl font-bold text-gray-800">{activeOrders.filter(o => o.order.status === 'preparing').length}</div>
              <div className="text-xs text-gray-600">Preparing</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-600">
              <div className="text-2xl font-bold text-gray-800">{doneOrders.length}</div>
              <div className="text-xs text-gray-600">Done</div>
            </div>
          </div>

          {/* Active Orders */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Active Orders</h2>
            {activeOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No active orders</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeOrders.map(({ table, order }) => (
                  <div
                    key={order.id}
                    className={`bg-white rounded-lg p-4 border-2 ${getStatusColor(order.status)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          Table {table.number}
                        </div>
                        <div className="text-xs text-gray-600 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(order.sentAt)}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                        order.status === 'pending' 
                          ? 'bg-red-200 text-red-800' 
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {order.status}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="bg-white rounded p-2 border border-gray-200">
                          <div className="flex justify-between items-start">
                            <span className="font-semibold text-gray-700 text-sm">
                              {item.quantity}x {item.name}
                            </span>
                          </div>
                          {item.notes && (
                            <div className="text-xs text-orange-600 italic mt-1 bg-orange-50 px-2 py-1 rounded">
                              Note: {item.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(table.id, order.id, 'preparing')}
                          className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold text-sm transition-colors"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleUpdateOrderStatus(table.id, order.id, 'done')}
                          className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center space-x-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Mark Done</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ready Orders */}
          {doneOrders.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Done Orders</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doneOrders.map(({ table, order }) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg p-4 border-2 border-green-300 bg-green-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          Table {table.number}
                        </div>
                        <div className="text-xs text-gray-600">
                          Done at {formatTime(order.doneAt)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold bg-green-200 text-green-800">
                        <CheckCircle className="w-3 h-3" />
                        <span>Done</span>
                      </div>
                    </div>

                    <div className="space-y-1 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm font-semibold text-gray-700">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleUpdateOrderStatus(table.id, order.id, 'delivered')}
                      className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold text-sm transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}