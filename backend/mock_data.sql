-- 비밀번호는 Test1234!
INSERT INTO users (email, password, nickname, expired_date, report_count, is_admin)
VALUES ('admin@example.com', '$2b$10$JdQ0SCLzhknGSnTbLChhqe8wjzEeB1z7T60IlwV1st9X0pPg1TFP2', '관리자', '2024-05-07 16:22:15', 0, 1);

INSERT INTO users (email, password, nickname, expired_date, report_count, is_admin)
VALUES ('test@mail.com', '$2b$10$JdQ0SCLzhknGSnTbLChhqe8wjzEeB1z7T60IlwV1st9X0pPg1TFP2', '테스트 계정', '2024-05-07 16:22:15', 0, 0);