use my_db;
create table categories (
    cid int AUTO_INCREMENT PRIMARY KEY not null unique,
    cname varchar(100) not null,
    description varchar(100),
    addTime varchar(50) not null,
    imgUrl varchar(200) not null
)CHARSET=utf8;

use my_db;
create table goods (
    goodsId int PRIMARY KEY AUTO_INCREMENT unique,
    cid int not null ,
    goodsName varchar(100) not null,
    price decimal not null,
    goodsUrl varchar(200) not null,
    stocks bigint not null,
    addTime varchar(50) not null,
    updateTime varchar(50) not null,
    description varchar(100),
    foreign key (cid) references categories(cid)
)CHARSET=utf8;


use my_db;
create table orders (
    oid int AUTO_INCREMENT PRIMARY KEY not null unique,
    orderNum varchar(200) not null,
    orderStatus int,
    payWay int,
    totalNum int,
    totalPrice decimal(10,2),
    createTime varchar(50) not null
)CHARSET=utf8;

use my_db;
create table orderDetails (
    odid int AUTO_INCREMENT PRIMARY KEY not null,
    orderNum varchar(200),
    goodsId int,
    goodsName varchar(100) not null,
    goodsNum int,
    price decimal(10,2) not null,
    imgUrl varchar(200) not null
)CHARSET=utf8;

create table users (
    username varchar(10) unique,
    password varchar(20),
    createTime varchar(50) not null,
    role int(10)
)CHARSET=utf8;
