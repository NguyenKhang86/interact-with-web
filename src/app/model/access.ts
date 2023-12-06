export class UserProfile {
    fullname!: string;
    address!: string;
    gender!: string;
    phone!: string;
    money!: 0;
}
export class ChangePassword {
    oldPassword!: string;
    newPassword!: string;
}
// export class Transaction {
//     id!: string;
//     coin!: 0;
//     paid!: 0;
// }
// export class HistoryBank {
//     id!: string;
//     coin!: 0;
//     action!: string;
//     created!: string;
// }
export class Order {
    id!: string;
    quantity!: 0;
    sid!: string;
    url!: string;
}
export class Menu {
    id!: string;
    platfrom!: string;
    service!: Service1[];
}
export class Service1 {
    id!: string;
    title!: string;
    path!: string;
    price!: string;
}
export class Service2 {
    id!: string;
    title!: string;
    path!: 0;
}
export class ServiceDonGia {
    id!: string;
    title!: string;
    path!: string;
    price!: 0;
}
export class ServiceId {
    id!: string;
    pid!: string;
    title!: string;
    order!: 0;
    price!: 0;
    condition!: 0;
    maximum!: 0;
    path!: string;
    toltal!: 0;
    isActive!: true;
    created!: string;
    pidNavigation!: null
}
export class lichsumuahang {
    id!: String;
    title!: String;
    url!: string;
    quantity!: 0;
    price!: 0;
    money!: 0;
    status!: 0;
    created!: string;
}
// Nạp Ruta Tiền
export class Transaction01 {
    id!: string;
    money!: 0;
    action!: string;
    created!: string;
}