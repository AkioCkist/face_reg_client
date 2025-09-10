# Hướng dẫn dành cho GitHub Copilot - Dự án Điểm danh bằng Nhận diện Khuôn mặt

Chào Copilot, bạn đang hỗ trợ một dự án xây dựng hệ thống quản lý điểm
danh trong lớp học bằng công nghệ nhận diện khuôn mặt. Vui lòng tuân thủ
nghiêm ngặt các nguyên tắc và định hướng dưới đây khi gợi ý code. Mục
tiêu của chúng ta là tạo ra một sản phẩm có code \"sạch\", hiệu quả, dễ
bảo trì và có khả năng mở rộng.

## 1. Triết lý Tổng thể

-   **Ưu tiên sự đơn giản và rõ ràng**: Code phải dễ đọc và dễ hiểu cho
    > người khác. Tránh các giải pháp phức tạp không cần thiết.

-   **Tập trung vào nhu cầu hiện tại (YAGNI)**: Chỉ xây dựng những chức
    > năng thực sự cần thiết. Đừng thêm các tính năng mà \"có thể\" sẽ
    > cần trong tương lai.

-   **Viết code để dễ dàng thay đổi**: Cấu trúc của dự án phải linh hoạt
    > để có thể mở rộng hoặc thay đổi các yêu cầu nghiệp vụ trong tương
    > lai (ví dụ: thay đổi mô hình AI, thêm phương thức thông báo mới).

## 2. Các Nguyên tắc Thiết kế Cốt lõi (SOLID và các nguyên tắc khác)

### SOLID

-   **S - Single Responsibility Principle (Nguyên tắc Đơn trách
    > nhiệm)**:

    -   Mỗi class, module, hoặc function chỉ nên chịu trách nhiệm cho
        > MỘT công việc duy nhất.

    -   *Ví dụ*: Tách biệt rõ ràng các module: FaceRecognitionService
        > chỉ để nhận diện khuôn mặt, DatabaseService chỉ để tương tác
        > với CSDL, AttendanceService xử lý logic điểm danh, và
        > ReportGenerator chỉ để xuất báo cáo.

-   **O - Open/Closed Principle (Nguyên tắc Đóng/Mở)**:

    -   Có thể mở rộng chức năng (mở) mà không cần sửa đổi code hiện có
        > (đóng).

    -   *Gợi ý*: Sử dụng các mẫu thiết kế như Strategy hoặc Decorator.
        > Ví dụ, khi cần thêm một nhà cung cấp dịch vụ nhận diện khuôn
        > mặt mới, chúng ta chỉ cần tạo một class mới implement
        > interface IFaceRecognitionProvider mà không cần sửa code của
        > AttendanceService.

-   **L - Liskov Substitution Principle (Nguyên tắc Thay thế Liskov)**:
    > Các lớp con phải có thể thay thế lớp cha của chúng mà không làm
    > thay đổi tính đúng đắn của chương trình.

-   **I - Interface Segregation Principle (Nguyên tắc Phân tách
    > Interface)**:

    -   Tạo ra các interface nhỏ, chuyên biệt thay vì một interface lớn
        > và chung chung.

    -   *Ví dụ*: IClassManager (dành cho giáo viên/admin) và
        > IAttendanceViewer (dành cho sinh viên) là hai interface riêng
        > biệt thay vì một IUserAction cồng kềnh.

-   **D - Dependency Inversion Principle (Nguyên tắc Đảo ngược Phụ
    > thuộc)**:

    -   Các module cấp cao không nên phụ thuộc vào các module cấp thấp.
        > Cả hai nên phụ thuộc vào một abstraction (ví dụ: interface).

    -   *Gợi ý*: Sử dụng Dependency Injection (DI) để inject các service
        > (ví dụ IFaceRecognitionService, IDatabaseService) vào các lớp
        > nghiệp vụ.

### Các nguyên tắc khác

-   **DRY (Don't Repeat Yourself)**:

    -   Không lặp lại code. Thay vào đó, hãy tái cấu trúc để tạo ra các
        > hàm tiện ích (helper functions), services, hoặc components có
        > thể tái sử dụng.

    -   *Ví dụ*: Các logic xác thực dữ liệu đầu vào, kết nối CSDL, xử lý
        > lỗi API nên được đóng gói thành các hàm riêng.

-   **KISS (Keep it simple, stupid)**:

    -   Giữ cho mọi giải pháp đơn giản nhất có thể. Tránh tối ưu hóa sớm
        > hoặc các kiến trúc phức tạp không cần thiết cho quy mô hiện
        > tại của dự án.

-   **No Magic Numbers/Strings**:

    -   Không sử dụng các giá trị hằng số (số, chuỗi) trực tiếp trong
        > code.

    -   *Gợi ý*: Hãy định nghĩa chúng dưới dạng các hằng số có tên rõ
        > ràng (constants) hoặc enums.

    -   *Ví dụ*: Thay vì if (status == 1), hãy dùng if (status ==
        > AttendanceStatus.PRESENT). Thay vì confidence \> 0.95, hãy
        > dùng const MIN_CONFIDENCE_THRESHOLD = 0.95; và dùng confidence
        > \> MIN_CONFIDENCE_THRESHOLD.

## 3. Kiến trúc và Mẫu Thiết kế (Design Patterns)

-   **Kiến trúc ứng dụng Web**:

    -   Ưu tiên kiến trúc phân lớp (Layered Architecture): Presentation
        > Layer (UI), Business Logic Layer (Services), và Data Access
        > Layer (Repositories).

    -   Thiết kế API theo chuẩn RESTful, với các endpoint rõ ràng, có ý
        > nghĩa. Ví dụ: GET /api/classes/{classId}/attendance-report.

-   **Khả năng mở rộng (Scalability)**:

    -   Các tác vụ tốn nhiều thời gian như xử lý hình ảnh/video để nhận
        > diện khuôn mặt nên được thực hiện bất đồng bộ (asynchronously)
        > thông qua hàng đợi (message queue) để không làm block luồng
        > chính.

    -   Module nhận diện khuôn mặt có thể được thiết kế như một
        > microservice riêng biệt để có thể scale độc lập trong tương
        > lai.

-   **Mẫu thiết kế (Design Patterns)**:

    -   **Repository Pattern**: Sử dụng để trừu tượng hóa lớp truy cập
        > dữ liệu. Logic nghiệp vụ sẽ không làm việc trực tiếp với CSDL
        > mà thông qua các Repository (ví dụ: StudentRepository,
        > AttendanceRepository).

    -   **Strategy Pattern**: Sử dụng khi cần thay đổi linh hoạt các
        > thuật toán. Ví dụ: cho phép lựa chọn giữa các mô hình nhận
        > diện khuôn mặt khác nhau (FaceNetStrategy, ArcFaceStrategy).

    -   **Factory Pattern**: Sử dụng để tạo ra các đối tượng phức tạp,
        > ví dụ UserFactory để tạo các đối tượng Student, Teacher hoặc
        > Admin.

    -   **Observer Pattern**: Sử dụng để thông báo cho các thành phần
        > khác khi có sự kiện xảy ra. Ví dụ: khi một sinh viên được điểm
        > danh thành công, hệ thống sẽ tự động thông báo cho UI cập nhật
        > và gửi email cho phụ huynh (nếu có).

## 4. Code \"Sạch\" (Clean Code) và Tái cấu trúc (Refactoring)

-   **Quy tắc đặt tên**: Sử dụng tên biến, hàm, lớp có ý nghĩa, rõ ràng
    > và nhất quán theo quy ước của ngôn ngữ lập trình đang sử dụng (ví
    > dụ: camelCase cho biến/hàm, PascalCase cho lớp).

-   **Hàm (Functions)**: Mỗi hàm nên ngắn gọn, chỉ thực hiện một nhiệm
    > vụ duy nhất và có số lượng tham số tối thiểu.

-   **Chú thích (Comments)**: Viết chú thích để giải thích \"tại sao\"
    > (the why), chứ không phải \"cái gì\" (the what). Code nên tự nó
    > giải thích được \"cái gì\". Các logic phức tạp, các giả định hoặc
    > các quyết định thiết kế quan trọng cần được ghi chú rõ ràng.

-   **Xử lý lỗi (Error Handling)**: Xử lý lỗi một cách triệt để. Sử dụng
    > try-catch cho các hoạt động có thể phát sinh lỗi (I/O, network
    > calls). Trả về các thông báo lỗi có ý nghĩa cho người dùng hoặc
    > client.

-   **Tái cấu trúc (Refactoring)**: Luôn tìm cách cải thiện cấu trúc
    > code. Khi bạn thấy \"code smell\" (ví dụ: code lặp lại, hàm quá
    > dài, lớp quá lớn), hãy chủ động đề xuất các phương án tái cấu trúc
    > để làm cho code sạch hơn và hiệu quả hơn.
