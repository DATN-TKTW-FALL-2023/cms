import React from 'react'

const detail = () => {
  return (
    <div>
      <div className="container">
        <div className="mt-12 mb-12 px-8 py-4 shadow-htr rounded w-800px mx-auto">
          <div className="grid grid-cols-2">
            <div className="flex">
              <p className="text-2xl font-medium">HÓA ĐƠN </p>

              <p className="mt-3px mx-4">
                <span className="px-2 py-4px font-medium bg-#89ce84 text-xs text-white rounded">ĐÃ THANH TOÁN</span>
              </p>
            </div>
            <div>
              <div className="bill">
                <p className="font-medium">Ngày tạo hóa đơn: </p>
                <p className="text-#6a6868"></p>
              </div>
              <div className="bill">
                <p className="font-medium">Hình thức thanh toán: </p>
                <p className="text-#6a6868">NCB - Ngân Hàng Quốc Dân</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-12">
            <div>
              <p className="font-medium text-xl">Nhà cung cấp dịch vụ: </p>
              <p className="text-base mt-4">MOFY BOOKING COMPANY LTD</p>
            </div>
            <div>
              <p className="font-medium text-xl">Thông tin khách hàng: </p>
              <div className="mt-4">
                <p className="text-base"></p>
                <p className="text-base">{}</p>
                <p className="text-base">{}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="font-medium text-xl">Chi tiết đơn hàng: </p>
            </div>
            <div>
              <div className="mt-4 border-b-2 border-#ccc flex justify-between pr-8 pb-2">
                <p className="text-[#747373]">Tên Film</p>
                <p className="text-[#747373]">Phòng</p>
                <p className="text-[#747373]">Ghế</p>
                <p className="text-[#747373]">Thành tiền</p>
              </div>
              <div className="border-b-2 border-#ccc py-4 flex justify-between pr-8">
                <p>{}</p>
                <p>{}</p>
                <p></p>
                <p>{}đ</p>
              </div>
              <div className="py-4 flex justify-between pr-8">
                <div></div>
                <div className="flex">
                  <p className="mr-6 font-bold">Tổng tiền thanh toán</p>
                  <p className="">{}đ</p>
                </div>
              </div>
              <div className="flex justify-end pr-8 mt-2">
                <button className="btn w-18 text-white font-medium  py-2 rounded-lg">
                  <span></span>
                  <a href="/">Quay lại</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default detail
