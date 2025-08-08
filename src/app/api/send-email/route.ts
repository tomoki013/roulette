import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactFormSchema = z.object({
    name: z.string().min(1, { message: 'お名前は必須です。' }),
    email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
    subject: z.string().min(1, { message: '件名は必須です。' }),
    message: z.string().min(1, { message: 'メッセージは必須です。' }),
    inquiryType: z.string().min(1, { message: 'お問い合わせの種類は必須です。' }),
});

export async function POST(req: Request) {
    const body = await req.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
        const errorMessages = result.error.flatten().fieldErrors;
        const firstErrors = Object.keys(errorMessages).reduce((acc, key) => {
            acc[key] = errorMessages[key]![0];
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(
            {
                message: '入力内容に誤りがあります。',
                errors: firstErrors
            },
            { status: 400 }
        );
    }

    const { name, email, subject, message, inquiryType } = result.data;

    // 環境変数が設定されているか確認
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.error('Gmail credentials are not set in environment variables.');
        return NextResponse.json({ message: 'サーバー設定エラーです。' }, { status: 500 });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: true,
            }
        });

        await transporter.sendMail({
            from: email, // 送信元として表示されるアドレス
            to: process.env.GMAIL_USER, // 受信先のアドレス
            subject: `【Webでルーレット お問い合わせ】 ${subject}`,
            text: `
                お名前: ${name}
                メールアドレス: ${email}
                お問い合わせの種類: ${inquiryType}

                メッセージ:
                ${message}
            `,
        });

        return NextResponse.json({ message: 'メールが正常に送信されました。' }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('メール送信エラー:', error.message);
            console.error('詳細:', error);
        } else {
            console.error('予期しないエラー:', error);
        }
        return NextResponse.json({ message: 'メールの送信に失敗しました。時間をおいて再度お試しください。' }, { status: 500 });
    }
}
