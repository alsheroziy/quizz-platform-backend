
# Quizz API Documentation

## Foydalanuvchi autentifikatsiyasi va ro'yxatdan o'tish API'lari

### 1. `POST /api/auth/register`
**Maqsad:** Yangi foydalanuvchini ro'yxatdan o'tkazish.

#### Request:
- **URL:** `/api/auth/register`
- **Body:**
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "username": "johndoe",
    "password": "yourpassword"
  }
  ```
#### Response:
- **201:** Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi.
- **400:** Ro'yxatdan o'tishda xato.

---

### 2. `POST /api/auth/login`
**Maqsad:** Foydalanuvchini tizimga kiritish (login).

#### Request:
- **URL:** `/api/auth/login`
- **Body:**
  ```json
  {
    "emailOrUsername": "johndoe@example.com",
    "password": "yourpassword"
  }
  ```
#### Response:
- **200:** Token bilan foydalanuvchi login qildi.
- **401:** Parol noto'g'ri.
- **404:** Foydalanuvchi topilmadi.

---

### 3. `POST /api/auth/admin`
**Maqsad:** Admin foydalanuvchini ro'yxatdan o'tkazish.

#### Request:
- **URL:** `/api/auth/admin`
- **Body:**
  ```json
  {
    "firstname": "Admin",
    "lastname": "User",
    "email": "admin@example.com",
    "username": "adminuser",
    "password": "adminpassword"
  }
  ```
#### Response:
- **201:** Admin muvaffaqiyatli ro'yxatdan o'tdi.
- **400:** Ro'yxatdan o'tishda xato.

---

## Quizz API

### 1. `POST /api/quizzes/create`
**Maqsad:** Yangi quizz yaratish. Faqat admin foydalanuvchilar uchun.

#### Request:
- **URL:** `/api/quizzes/create`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Quizz title",
    "description": "Quizz description",
    "questions": [
      {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin"],
        "answer": "Paris"
      }
    ]
  }
  ```
#### Response:
- **201:** Quizz yaratildi.
- **403:** Foydalanuvchi admin emas.
- **400:** Xato yuz berdi.

---

### 2. `POST /api/quizzes/:quizzId/comments`
**Maqsad:** Quizzga komment qo'shish.

#### Request:
- **URL:** `/api/quizzes/:quizzId/comments`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "comment": "This is a comment."
  }
  ```
#### Response:
- **201:** Komment muvaffaqiyatli qo'shildi.
- **400:** Xato yuz berdi.

---

### 3. `GET /api/quizzes/:quizzId/comments`
**Maqsad:** Quizzga qo'yilgan barcha kommentlarni olish.

#### Request:
- **URL:** `/api/quizzes/:quizzId/comments`
- **Headers:**
  - `Authorization: Bearer <token>`

#### Response:
- **200:** Kommentlar qaytarildi.
- **404:** Quizz topilmadi.
- **400:** Xato yuz berdi.

---

### 4. `PUT /api/comments/reply/:quizzId/:commentId`
**Maqsad:** Admin tomonidan kommentga javob yozish.

#### Request:
- **URL:** `/api/comments/reply/:quizzId/:commentId`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "reply": "Admin javobi."
  }
  ```
#### Response:
- **200:** Javob qo'shildi.
- **403:** Foydalanuvchi admin emas.
- **404:** Komment topilmadi.
- **400:** Xato yuz berdi.

---

### 5. `POST /api/quizzes/like/:id`
**Maqsad:** Quizzga like qo'shish.

#### Request:
- **URL:** `/api/quizzes/like/:id`
- **Headers:**
  - `Authorization: Bearer <token>`

#### Response:
- **200:** Like qo'shildi.
- **400:** Xato yuz berdi.

---

### 6. `POST /api/quizzes/dislike/:id`
**Maqsad:** Quizzga dislike qo'shish.

#### Request:
- **URL:** `/api/quizzes/dislike/:id`
- **Headers:**
  - `Authorization: Bearer <token>`

#### Response:
- **200:** Dislike qo'shildi.
- **400:** Xato yuz berdi.

---

## Middleware

### 1. `authMiddleware`
**Maqsad:** Foydalanuvchini JWT token orqali autentifikatsiyalash.

#### Jarayon:
- Token `Authorization` header'dan olinadi va tekshiriladi.
- Token to'g'ri bo'lsa, `req.user` ga foydalanuvchi ma'lumotlari qo'shiladi.
- Agar token noto'g'ri bo'lsa, foydalanuvchi rad etiladi.
