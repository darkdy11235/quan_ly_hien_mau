drop database if exists quan_ly_hien_mau;
create database if not exists quan_ly_hien_mau;

use quan_ly_hien_mau;

CREATE TABLE IF NOT EXISTS tinh_tp (
  ma_tinh_tp INT PRIMARY KEY AUTO_INCREMENT,
  ten_tinh_tp NVARCHAR(50) 
);

CREATE TABLE IF NOT EXISTS quan_h (
  ma_quan_h INT PRIMARY KEY AUTO_INCREMENT,
  ten_quan_h NVARCHAR(50) ,
  ma_tinh_tp INT 
);

-- create foreign key for quan_h --
alter table quan_h add constraint fk_quan_h_ma_tinh_tp foreign key (ma_tinh_tp) references tinh_tp(ma_tinh_tp);

create table if not exists phuong_xa (
    ma_phuong_xa int primary key auto_increment,
    ten_phuong_xa nvarchar(50) ,
    ma_quan_h int 
);

-- create foreign key for phuong_xa --
alter table phuong_xa add constraint fk_phuong_xa_ma_quan_h foreign key (ma_quan_h) references quan_h(ma_quan_h);

create table if not exists dia_chi_cu_the (
    ma_dia_chi_cu_the int primary key auto_increment,
    dia_chi nvarchar(255) ,
    ma_phuong_xa int 
);

-- create foreign key for dia_chi_cu_the --
alter table dia_chi_cu_the add constraint fk_dia_chi_cu_the_ma_phuong_xa foreign key (ma_phuong_xa) references phuong_xa(ma_phuong_xa);

create table if not exists thong_bao (
    ma_thong_bao int primary key auto_increment,
    noi_dung nvarchar(255)
);

create table if not exists benh (
    ma_benh int primary key auto_increment,
    ten_benh varchar(50) ,
    mo_ta varchar(255)
);

create table if not exists nhom_mau (
    ma_nhom_mau int primary key auto_increment,
    ten_nhom_mau nvarchar(50)  unique,
    mo_ta varchar(255)
);

create table if not exists nguoi_dung (
    ma_nguoi_dung int primary key auto_increment,
    ten_dang_nhap varchar(50)  unique,
    mat_khau varchar(255) ,
    trang_thai nvarchar(10) ,
    quyen ENUM('QuanTriVien', 'DonViToChuc', 'TinhNguyenVien')  default 'TinhNguyenVien'
);

-- alter trang_thai column in nguoi_dung table --
alter table nguoi_dung modify trang_thai enum('Hoạt động', 'Khoá') default 'Hoạt động';

create table if not exists thong_bao_nguoi_dung (
    ma_thong_bao int ,
    ma_nguoi_dung int ,
    thoi_gian datetime ,
    trang_thai nvarchar(10) 
);

-- create primary key for thong_bao_nguoi_dung --
alter table thong_bao_nguoi_dung add primary key (ma_thong_bao, ma_nguoi_dung);

-- create foreign key for thong_bao_nguoi_dung --
alter table thong_bao_nguoi_dung add constraint fk_thong_bao_nguoi_dung_ma_thong_bao foreign key (ma_thong_bao) references thong_bao(ma_thong_bao);
alter table thong_bao_nguoi_dung add constraint fk_thong_bao_nguoi_dung_ma_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

-- alter trang_thai column in thong_bao_nguoi_dung table --
alter table thong_bao_nguoi_dung modify trang_thai enum('Đã đọc', 'Chưa đọc') default 'Chưa đọc';

create table if not exists tinh_nguyen_vien (
    ma_tnv int primary key auto_increment,
    ten_tnv nvarchar(50) ,
    cmnd_cccd varchar(15)  unique,
    ngay_sinh date ,
    gioi_tinh nvarchar(10),
    so_dien_thoai varchar(15)  unique,
    email varchar(50) ,
    nghe_nghiep nvarchar(50) ,
    ma_dia_chi_cu_the int ,
    ma_nhom_mau int ,
    ma_nguoi_dung int  unique
);

-- create foreign key for tinh_nguyen_vien --
alter table tinh_nguyen_vien add constraint fk_tinh_nguyen_vien_ma_dia_chi_cu_the foreign key (ma_dia_chi_cu_the) references dia_chi_cu_the(ma_dia_chi_cu_the);
alter table tinh_nguyen_vien add constraint fk_tinh_nguyen_vien_ma_nhom_mau foreign key (ma_nhom_mau) references nhom_mau(ma_nhom_mau);
alter table tinh_nguyen_vien add constraint fk_tinh_nguyen_vien_ma_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

-- check data of ten_tnv column in tinh_nguyen_vien table --
alter table tinh_nguyen_vien add constraint chk_tinh_nguyen_vien_ten_tnv check (ten_tnv like '% %');

-- alter gioi_tinh column in tinh_nguyen_vien table --
alter table tinh_nguyen_vien modify gioi_tinh enum('Nam', 'Nữ') default 'Nam';

-- alter so_dien_thoai column in tinh_nguyen_vien table --
alter table tinh_nguyen_vien modify so_dien_thoai varchar(15) check (so_dien_thoai like '0%');

-- alter email column in tinh_nguyen_vien table --
alter table tinh_nguyen_vien modify email varchar(50) check (email like '%@%.%');

create table if not exists don_vi_to_chuc (
    ma_don_vi_to_chuc int primary key auto_increment,
    ten_don_vi_to_chuc nvarchar(50) ,
    nguoi_quan_ly nvarchar(50) ,
    so_dien_thoai varchar(15) ,
    email varchar(50) ,
    anh varchar(255) ,
    ma_dia_chi_cu_the int ,
    ma_nguoi_dung int 
);

-- create foreign key for don_vi_to_chuc --
alter table don_vi_to_chuc add constraint fk_don_vi_to_chuc_ma_dia_chi_cu_the foreign key (ma_dia_chi_cu_the) references dia_chi_cu_the(ma_dia_chi_cu_the);
alter table don_vi_to_chuc add constraint fk_don_vi_to_chuc_ma_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

-- check data of ten_don_vi_to_chuc column in don_vi_to_chuc table --
alter table don_vi_to_chuc add constraint chk_don_vi_to_chuc_ten_don_vi_to_chuc check (ten_don_vi_to_chuc like '% %');

-- alter so_dien_thoai column in don_vi_to_chuc table --
alter table don_vi_to_chuc modify so_dien_thoai varchar(15) check (so_dien_thoai like '0%');

-- alter email column in don_vi_to_chuc table --
alter table don_vi_to_chuc modify email varchar(50) check (email like '%@%.%');

create table if not exists bai_dang (
    ma_bai_dang int primary key auto_increment,
    tieu_de nvarchar(50) ,
    noi_dung text ,
    ngay_dang date ,
    ngay_hien_mau date ,
    gio_bat_dau int ,
    gio_ket_thuc int ,
    dia_chi text ,
    trang_thai nvarchar(20) ,
    ma_dvtc int 
);

-- create foreign key for bai_dang --
alter table bai_dang add constraint fk_bai_dang_ma_don_vi_to_chuc foreign key (ma_dvtc) references don_vi_to_chuc(ma_don_vi_to_chuc);

-- alter trang_thai column in bai_dang table --
alter table bai_dang modify trang_thai enum('Chưa diễn ra', 'Đang diễn ra', 'Đã kết thúc') default 'Chưa diễn ra';

create table if not exists nhom_mau_can_hien (
    ma_nhom_mau int ,
    ma_bai_dang int ,
    so_luong int ,
    primary key (ma_nhom_mau, ma_bai_dang)
);

-- create foreign key for nhom_mau_can_hien --
alter table nhom_mau_can_hien add constraint fk_nhom_mau_can_hien_ma_nhom_mau foreign key (ma_nhom_mau) references nhom_mau(ma_nhom_mau);
alter table nhom_mau_can_hien add constraint fk_nhom_mau_can_hien_ma_bai_dang foreign key (ma_bai_dang) references bai_dang(ma_bai_dang);

create table if not exists mau (
    ma_mau int primary key auto_increment,
    ma_nhom_mau int ,
    ma_tnv int ,
    ma_bai_dang int 
);

-- create foreign key for mau --
alter table mau add constraint fk_mau_ma_nhom_mau foreign key (ma_nhom_mau) references nhom_mau(ma_nhom_mau);
alter table mau add constraint fk_mau_ma_tnv foreign key (ma_tnv) references tinh_nguyen_vien(ma_tnv);
alter table mau add constraint fk_mau_ma_bai_dang foreign key (ma_bai_dang) references bai_dang(ma_bai_dang);

create table if not exists mau_benh (
    ma_mau int ,
    ma_benh int 
);

-- create primary key for mau_benh --
alter table mau_benh add constraint pk_mau_benh primary key (ma_mau, ma_benh);

-- create foreign key for mau_benh --
alter table mau_benh add constraint fk_mau_benh_ma_mau foreign key (ma_mau) references mau(ma_mau);
alter table mau_benh add constraint fk_mau_benh_ma_benh foreign key (ma_benh) references benh(ma_benh);

create table if not exists phieu_dang_ky (
    ma_phieu_dang_ky int primary key auto_increment,
    ngay_dang_ky date ,
    gio_dang_ky int ,
    trang_thai nvarchar(10) ,
    ma_tnv int ,
    ma_bai_dang int 
);

-- create foreign key for phieu_dang_ky --
alter table phieu_dang_ky add constraint fk_phieu_dang_ky_ma_tnv foreign key (ma_tnv) references tinh_nguyen_vien(ma_tnv);
alter table phieu_dang_ky add constraint fk_phieu_dang_ky_ma_bai_dang foreign key (ma_bai_dang) references bai_dang(ma_bai_dang);

-- alter trang_thai column in phieu_dang_ky table --
alter table phieu_dang_ky modify trang_thai enum('Đã đăng ký', 'Đã hủy', 'Đã tham gia') default 'Đã đăng ký';

create table if not exists chung_nhan (
    ma_chung_nhan int primary key auto_increment,
    ngay_cap date ,
    dia_chi text ,
    co_so_tiep_nhan text ,
    so_serri varchar(20) ,
    anh text ,
    trang_thai nvarchar(10) ,
    ma_tnv int 
);

-- create foreign key for chung_nhan --
alter table chung_nhan add constraint fk_chung_nhan_ma_tnv foreign key (ma_tnv) references tinh_nguyen_vien(ma_tnv);

-- alter trang_thai column in chung_nhan table --
alter table chung_nhan modify trang_thai enum('Đang chờ duyệt', 'Đã duyệt', 'Đã hủy') default 'Đang chờ duyệt';

create table if not exists dap_an (
    ma_dap_an int primary key auto_increment,
    noi_dung text ,
    gia_tri int 
);

create table if not exists cau_hoi (
    ma_cau_hoi int primary key auto_increment,
    noi_dung text 
);

create table if not exists cau_hoi_dap_an (
    ma_cau_hoi int ,
    ma_dap_an int 
);

-- create primary key for cau_hoi_dap_an --
alter table cau_hoi_dap_an add constraint pk_cau_hoi_dap_an primary key (ma_cau_hoi, ma_dap_an);

-- create foreign key for cau_hoi_dap_an --
alter table cau_hoi_dap_an add constraint fk_cau_hoi_dap_an_ma_cau_hoi foreign key (ma_cau_hoi) references cau_hoi(ma_cau_hoi);
alter table cau_hoi_dap_an add constraint fk_cau_hoi_dap_an_ma_dap_an foreign key (ma_dap_an) references dap_an(ma_dap_an);

create table if not exists  phieu_dang_ky_cau_hoi (
    ma_phieu_dang_ky int ,
    ma_cau_hoi int ,
    ma_dap_an int 
);

-- create primary key for phieu_dang_ky_cau_hoi --
alter table phieu_dang_ky_cau_hoi add constraint pk_phieu_dang_ky_cau_hoi primary key (ma_phieu_dang_ky, ma_cau_hoi, ma_dap_an);

-- create foreign key for phieu_dang_ky_cau_hoi --
alter table phieu_dang_ky_cau_hoi add constraint fk_phieu_dang_ky_cau_hoi_ma_phieu_dang_ky foreign key (ma_phieu_dang_ky) references phieu_dang_ky(ma_phieu_dang_ky);
alter table phieu_dang_ky_cau_hoi add constraint fk_phieu_dang_ky_cau_hoi_ma_cau_hoi foreign key (ma_cau_hoi) references cau_hoi(ma_cau_hoi);


DELIMITER //

CREATE TRIGGER thong_bao_dang_ky_tai_khoan
AFTER INSERT
ON nguoi_dung FOR EACH ROW
BEGIN
    INSERT INTO thong_bao_nguoi_dung (ma_nguoi_dung,ma_thong_bao,thoi_gian,trang_thai) VALUES (NEW.ma_nguoi_dung,1,NOW(),'Chưa đọc');
END //

DELIMITER ;

-- insert data into table --

-- insert data into tinh_tp table --
insert into tinh_tp (ten_tinh_tp) values  
    ('Hà Nội'), 
    ('Hồ Chí Minh'),
    ('Hải Phòng'),
    ('Đà Nẵng'),
    ('Cần Thơ'),
    ('An Giang'),
    ('Bà Rịa - Vũng Tàu'),
    ('Bắc Giang'),
    ('Bắc Kạn'),
    ('Bạc Liêu'),
    ('Bắc Ninh'),
    ('Bến Tre'),
    ('Bình Định'),
    ('Bình Dương'),
    ('Bình Phước'),
    ('Bình Thuận'),
    ('Cà Mau'),
    ('Cao Bằng'),
    ('Đắk Lắk'),
    ('Đắk Nông'),
    ('Điện Biên'),
    ('Đồng Nai'),
    ('Đồng Tháp'),
    ('Gia Lai'),
    ('Hà Giang'),
    ('Hà Nam'),
    ('Hà Tĩnh'),
    ('Hải Dương'),
    ('Hậu Giang'),
    ('Hòa Bình'),
    ('Hưng Yên'),
    ('Khánh Hòa'),
    ('Kiên Giang'),
    ('Kon Tum'),
    ('Lai Châu'),
    ('Lâm Đồng'),
    ('Lạng Sơn'),
    ('Lào Cai'),
    ('Long An'),
    ('Nam Định'),
    ('Nghệ An'),
    ('Ninh Bình'),
    ('Ninh Thuận'),
    ('Phú Thọ'),
    ('Quảng Bình'),
    ('Quảng Nam'),
    ('Quảng Ngãi'),
    ('Quảng Ninh'),
    ('Quảng Trị'),
    ('Sóc Trăng'),
    ('Sơn La'),
    ('Tây Ninh'),
    ('Thái Bình'),
    ('Thái Nguyên'),
    ('Thanh Hóa'),
    ('Thừa Thiên Huế'),
    ('Tiền Giang'),
    ('Trà Vinh'),
    ('Tuyên Quang'),
    ('Vĩnh Long'),
    ('Vĩnh Phúc'),
    ('Yên Bái');

-- insert data into quan_h table --
-- da nang --
insert into quan_h (ten_quan_h, ma_tinh_tp) values
    ('Quận Hải Châu', 4),
    ('Quận Cẩm Lệ', 4),
    ('Quận Thanh Khê', 4),
    ('Quận Sơn Trà', 4),
    ('Quận Ngũ Hành Sơn', 4),
    ('Quận Liên Chiểu', 4),
    ('Huyện Hòa Vang', 4),
    ('Huyện Hoàng Sa', 4);

-- insert data into phuong_xa table --
-- quan hai chau --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Phường Thanh Bình', 1),
    ('Phường Thuận Phước', 1),
    ('Phường Thạch Thang', 1),
    ('Phường Hải Châu 1', 1),
    ('Phường Hải Châu 2', 1),
    ('Phường Phước Ninh', 1),
    ('Phường Hòa Thuận Đông', 1),
    ('Phường Hòa Thuận Tây', 1),
    ('Phường Nam Dương', 1),
    ('Phường Bình Hiên', 1),
    ('Phường Bình Thuận', 1),
    ('Phường Hòa Cường Bắc', 1),
    ('Phường Hòa Cường Nam', 1);

-- quan cam le --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Phường Khuê Trung', 2),
    ('Phường Hòa Phát', 2),
    ('Phường Hòa An', 2),
    ('Phường Hòa Thọ Đông', 2),
    ('Phường Hòa Thọ Tây', 2),
    ('Phường Hòa Xuân', 2);

-- quan thanh khe --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Phường Thanh Khê Tây', 3),
    ('Phường Thanh Khê Đông', 3),
    ('Phường Xuân Hà', 3),
    ('Phường Tân Chính', 3),
    ('Phường Chính Gián', 3),
    ('Phường Vĩnh Trung', 3),
    ('Phường Thạc Gián', 3),
    ('Phường An Khê', 3),
    ('Phường Hòa Khê', 3),
    ('Phường Tam Thuận', 3);

-- quan son tra --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Phường Mân Thái', 4),
    ('Phường An Hải Bắc', 4),
    ('Phường Phước Mỹ', 4),
    ('Phường An Hải Tây', 4),
    ('Phường An Hải Đông', 4),
    ('Phường Thọ Quang', 4),
    ('Phường Nại Hiên Đông', 4);

-- quan ngu hanh son --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Phường Mỹ An', 5),
    ('Phường Khuê Mỹ', 5),
    ('Phường Hoà Quý', 5),
    ('Phường Hoà Hải', 5);

-- quan lien chieu --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Phường Hòa Hiệp Bắc', 6),
    ('Phường Hòa Hiệp Nam', 6),
    ('Phường Hòa Khánh Bắc', 6),
    ('Phường Hòa Khánh Nam', 6),
    ('Phường Hòa Minh', 6);

-- huyen hoa vang --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Thị trấn Hòa Vang', 7),
    ('Xã Hòa Bắc', 7),
    ('Xã Hòa Liên', 7),
    ('Xã Hòa Ninh', 7),
    ('Xã Hòa Sơn', 7),
    ('Xã Hòa Nhơn', 7),
    ('Xã Hòa Phong', 7),
    ('Xã Hòa Phú', 7),
    ('Xã Hòa Phước', 7),
    ('Xã Hòa Khương', 7),
    ('Xã Hòa Châu', 7),
    ('Xã Hòa Tiến', 7);

-- huyen hoang sa --
insert into phuong_xa (ten_phuong_xa, ma_quan_h) values
    ('Hoàng Sa', 8);

insert into dia_chi_cu_the (dia_chi,ma_phuong_xa) values
    ('44 Thanh Long', 1);
-- insert data into nhom_mau table --
insert into nhom_mau (ten_nhom_mau,mo_ta) values
    ('A+','Nhóm máu A+'),
    ('A-', 'Nhóm máu A-'),
    ('B+','Nhóm máu B+'),
    ('B-','Nhóm máu B-'),
    ('AB+','Nhóm máu AB+'),
    ('AB-','Nhóm máu AB-'),
    ('O+','Nhóm máu O+'),
    ('O-','Nhóm máu O-');

insert into thong_bao (noi_dung) values
    ('Tạo tài khoản thành công, chào mừng bạn đến với hienmaunhandaodanang.com');

-- insert data into cau_hoi table --
insert into cau_hoi (noi_dung) values
    ('Anh/chị đã từng hiến máu chưa?'),
    ('Hiện tại, anh/chị có bị các bệnh: viêm khớp, dạ dày, viêm gan/vàng da, bệnh tim, huyết áp thấp/cao, hen, ho kéo dài, bệnh máu, lao?'),
    ('Trong vòng 12 tháng gần đây, anh/chị có mắc các bệnh và đã được điều trị khỏi'),
    ('Trong vòng 06 tháng gần đây, anh/chị có bị một trong số các triệu chứng sau không?'),
    ('Trong 01 tháng gần đây anh/chị có'),
    ('Trong 07 ngày gần đây anh/chị có'),
    ('Câu hỏi dành cho phụ nữ'),
    ('Anh/chị có đồng ý xét nghiệm HIV, nhận thông báo và được tư vấn khi kết quả xét nghiệm HIV nghi ngờ hoặc dương tính?'),
    ('Bạn đã tiêm vaccine Covid chưa?');







-- insert data into dap_an table --
insert into dap_an (noi_dung,gia_tri) values 
    ('Có',1),
    ('Có',0),
    ('Không',1),
    ('Không',0),
    ('Sốt rét, Giang mai, Lao, Viêm não, Phẫu thuật ngoại khoa',0),
    ('Được truyền máu và các chế phẩm máu',0),
    ('Tiêm Vacxin bệnh dại.',0),
    ('Sút cân nhanh không rõ nguyên nhân?',0),
    ('Nổi hạch kéo dài',0),
    ('Chữa răng, châm cứu',0),
    ('Xăm mình, xỏ lỗ tai, lỗ mũi.',0),
    ('Sử dụng ma tuý',0),
    ('Quan hệ tình dục với người nhiễm HIV hoặc người có hành vi nguy cơ lây nhiễm HIV',0),
    ('Quan hệ tình dục với người cùng giới',0),
    ('Khỏi bệnh sau khi mắc bệnh viêm đường tiết niệu, viêm da nhiễm trùng, viêm phê quản, viêm phổi, sởi, quai bị, Rubella, Khác',0),
    ('Tiêm vắc xin phòng bệnh',0),
    ('Đi vào vùng có dịch bệnh lưu hành (sốt rét, sốt xuất huyết, Zika, ...)',0),
    ('Bị cảm cúm (ho, nhức đầu, sốt...)',0),
    ('Dùng thuốc kháng sinh, Aspirin, Corticoid',0),
    ('Tiêm Vacxin phòng VIêm gan siêu vi B, Human Papilloma Virus.',0),
    ('Hiện có thai, hoặc nuôi con dưới 12 tháng tuổi',0),
    ('Có kinh nguyệt trong vòng một tuần hay không',0),
    ('Đã tiêm',1),
    ('Chưa tiêm',0);

insert into cau_hoi_dap_an (ma_cau_hoi,ma_dap_an) values
(1,1),
(1,3),
(2,2),
(2,3),
(3,5),
(3,6),
(3,7),
(3,3),
(4,8),
(4,9),
(4,10),
(4,11),
(4,12),
(4,13),
(4,14),
(4,3),
(5,15),
(5,16),
(5,17),
(5,3),
(6,18),
(6,19),
(6,20),
(6,3),
(7,21),
(7,22),
(7,3),
(8,1),
(8,3),
(9,23),
(9,24);

-- insert data into nguoi_dung table --
insert into nguoi_dung (ten_dang_nhap,mat_khau,trang_thai,quyen) values
    ('admin123','$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe','Hoạt động','QuanTriVien'),
    ('dvtc123','$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe','Hoạt động','DonViToChuc'),
    ('tnv123','$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe','Hoạt động','TinhNguyenVien');

-- insert data into don_vi_to_chuc table --
insert into don_vi_to_chuc (ten_don_vi_to_chuc, nguoi_quan_ly,so_dien_thoai,email,anh,ma_dia_chi_cu_the,ma_nguoi_dung) values
    ('Khoa huyết học Đà Nẵng','Nguyễn Văn A','0123456789','khhdn@gmail.com','anh1.jpg',1,2);

-- insert data into tinh_nguyen_vien table --
insert into tinh_nguyen_vien (ten_tnv,cmnd_cccd,ngay_sinh,gioi_tinh,so_dien_thoai,email,nghe_nghiep,ma_dia_chi_cu_the,ma_nhom_mau,ma_nguoi_dung) values
    ('Huynh Trong Khoa', '123456789', '1999-01-01', 'Nam', '0123456789', 'khoa@gmail.com', 'Sinh viên', 1, 1, 3);
-- insert data into bai_dang table --
insert into bai_dang (tieu_de,noi_dung,ngay_dang,ngay_hien_mau,gio_bat_dau,gio_ket_thuc,dia_chi,trang_thai,ma_dvtc) values
    ('Hiến máu - Trung Tâm Hiến Máu Nhân Đạo Đà Nẵng','Trung Tâm Hiến Máu Nhân Đạo Đà Nẵng', '2022-02-20', '2022-06-20', 8, 12, '44 Thanh Long', 'Đã kết thúc', 1),
    ('Hiến máu - Trung Tâm Hiến Máu Nhân Đạo Đà Nẵng','Trung Tâm Hiến Máu Nhân Đạo Đà Nẵng', '2023-02-20', '2023-06-20', 8, 12, '44 Thanh Long', 'Chưa diễn ra', 1);

-- insert data into nhom_mau_can_hien table --
insert into nhom_mau_can_hien (ma_nhom_mau,ma_bai_dang,so_luong) values
    (1,1,10),
    (2,1,10),
    (3,1,10),
    (4,1,10),
    (5,1,10),
    (6,1,10),
    (7,1,10),
    (8,1,10);

-- insert data into phieu_dang_ky table --
insert into phieu_dang_ky (ngay_dang_ky,gio_dang_ky,trang_thai,ma_tnv,ma_bai_dang) values 
    ('2022-02-20', 8, 'Đã tham gia', 1, 1),
    ('2023-02-20', 8, 'Đã đăng ký', 1, 2);

insert into phieu_dang_ky_cau_hoi (ma_phieu_dang_ky,ma_cau_hoi,ma_dap_an) values
    (1,1,1),
    (1,2,3),
    (1,3,3),
    (1,4,3),
    (1,5,3),
    (1,6,3),
    (1,7,3),
    (1,8,3),
    (1,9,23),
    (2,1,1),
    (2,2,3),
    (2,3,3),
    (2,4,3),
    (2,5,3),
    (2,6,3),
    (2,7,3),
    (2,8,3),
    (2,9,23);

insert into benh (ten_benh,mo_ta) values
    ('HIV', 'HIV'),
    ('Viêm gan B', 'Viêm gan B'),
    ('Viêm gan C', 'Viêm gan C'),
    ('Sốt xuất huyết', 'Sốt xuất huyết');

insert into mau (ma_nhom_mau,ma_tnv,ma_bai_dang) values
    (1,1,1);

insert into mau_benh (ma_mau,ma_benh) values
    (1,1);



