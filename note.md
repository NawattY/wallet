Point API
GET\_/api/wallet/cbbf21f0-90ba-402f-9334-39f5f92a157c/expired
GET\_/api/wet-market/period-balances
GET\_/api/wallet/cbbf21f0-90ba-402f-9334-39f5f92a157c
POST\_/api/wallet/deposit
POST\_/api/wallet/transfer
POST wallet/refund
GET transfers

GET wallet/cbbf21f0-90ba-402f-9334-39f5f92a157c
GET wallet/cbbf21f0-90ba-402f-9334-39f5f92a157c/expired
POST wallet/transfer
POST wallet/refund
GET transfers
POST wallet/deposit ==> ตอนนี้เหมือนจะเอาไว้ใช้สร้าง wallet เท่านั้น แต่มี API!!!!
POST wet-market/extend-point-expiration
GET wet-market/period-balances

จาก WalletService ใน API Core

- Get 'wallet/' . $userId
- Get wallet/$userId/expired
- Post wallet/deposit
- Post wallet/transfer
- Post wallet/refund
- Get transfers
- Post wet-market/extend-point-expiration
- Get wet-market/period-balances

#transactions type
deducted
deposit
expired
refund
topup
withdraw

#transfers type
birthday_promotion
burn
deal_for_you
earn
give
lucky_draw
privilege
product
promotion
refund
