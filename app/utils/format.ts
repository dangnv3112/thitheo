/**
 * Định dạng số thành chuỗi tiền tệ VND
 * @param amount Số tiền cần định dạng
 * @returns Chuỗi tiền tệ đã định dạng (VD: 15.000 ₫)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Định dạng ngày theo định dạng dd/mm/yyyy
 * @param dateString Chuỗi ngày cần định dạng
 * @returns Chuỗi ngày đã định dạng
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}; 