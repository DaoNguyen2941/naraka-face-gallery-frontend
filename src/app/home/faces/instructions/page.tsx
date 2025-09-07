"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Instructions() {
    const router = useRouter();

    return (

        <div className="relative min-h-screen w-full bg-[url('/Naraka.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="backdrop-blur-md bg-black/70 rounded-2xl shadow-lg p-6 space-y-6">

                    <h1 className="text-4xl font-bold mb-4 text-center">Hướng dẫn sử dụng QR Face để tạo mẫu mặt cho nhân vật Naraka</h1>

                    <section className="space-y-3">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay về
                        </button>
                        <h2 className="text-2xl font-semibold">Bước 1: Tải ảnh QR-Code</h2>
                        <p>
                            Truy cập trang cung cấp QR face của nhân vật bạn muốn. Tải xuống ảnh QR-Code và lưu vào máy tính. Hình minh họa bên dưới:
                        </p>
                        <img
                            src="/images/qr-download.png"
                            alt="Tải QR-Code"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Bước 2: Chọn nhân vật trong game</h2>
                        <p>
                            Ở giao diện game, vào phần tướng.
                        </p>
                        <img src="/instructions/b1.png" alt="Chọn nhân vật"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />
                        <p>
                            - Chọn tướng bạn muốn áp dụng mẫu làm đẹp, sau đó chọn: <strong>Dịch Dung</strong>.
                        </p>
                        <img src="/instructions/b2.png" alt="Chọn dịch dung"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />
                        <p>
                            - Sau đó chọn ô có dấu "+" để tạo dung mạo mới.
                        </p>
                        <img src="/instructions/b3.png" alt="Chọn nhập"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />

                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Bước 3: Sử dụng QR-Code</h2>
                        <p>
                            - Ở giao diện trỉnh sửa khuân mặt chọn: <strong>Nhập</strong>.
                        </p>
                        <img src="/instructions/b4.png" alt="Chọn file QR"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />
                        <p>
                            - Một cửa sổ mở ra để chọn file. Chọn ảnh QR-Code từ thư mục bạn đã tải ảnh về đó ( Ở trường hợp của tôi nó ở phần dowload), sau đó chọn Open. Hệ thống sẽ tự động áp dụng kiểu trang điểm/mặt cho nhân vật.
                        </p>

                        <img src="/instructions/b5.png" alt="Chọn file QR"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />

                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold">Bước 4: Lưu và đặt tên</h2>
                        <p>
                            - Sau khi mẫu mặt được áp dụng, nhấn <strong>Lưu thành số liệu mới</strong>.
                        </p>
                        <img src="/instructions/b6.png" alt="Lưu mẫu mặt"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />
                        <p>
                            - Sau đó đặt tên và bấm <strong>Lưu thành số liệu mới</strong> vậy là bạn có thể sử dụng mẫu mặt này bất cứ lúc nào
                        </p>

                        <img src="/instructions/b7.png" alt="Lưu mẫu mặt"
                            className="rounded shadow-md w-full hover:scale-105 transition-transform"
                        />

                    </section>

                    <section className="space-y-3">
                        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-600 mt-4">
                            <p className="text-yellow-400 font-semibold mb-1">Lưu ý:</p>
                            <p className="text-sm text-gray-200">
                                - Khi lưu mã Qr cần chọn đúng theo cụm server mà bạn chơi ( china hoạc quốc tế), vì Qr cần có dữ liệu từ server mới có thể áp dụng.
                                Cũng có ngoại lệ, một số mã Qr có thể sử dụng cho cả hai server.
                            </p>
                            <p>
                                - mỗi một mã Qr chỉ áp dụng cho 1 nhân vật duy nhất, hãy chọn nhân vật phù hợp để áp dụng mã Qr hoạc chọn mã Qr theo nhân vật mà bạn yêu thíc.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
