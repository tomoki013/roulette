# README

## 英語 (English)

**Read in other languages: [日本語](#日本語-japanese) | [Español](#español-spanish) | [Français](#français-french)**

## Roulette on the Web

This is a [Next.js](https://nextjs.org/) project for a web-based roulette application. Users can create, save, and share custom roulettes. This application is designed to be intuitive and fun for various purposes, from everyday decision-making to event planning.

## Live Demo

You can experience the application here: **[Roulette on the Web](https://webroulette.netlify.app/)**

## ✨ Features

### Current Features

* **Guest Use**: Create and spin a basic roulette without an account ([original-roulette/page.tsx](https:/www.google.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Custom Roulette Creation**: Freely set items, ratios (weights), and colors for the roulette wheel.
* **Spin Animation**: Spin the roulette with a smooth animation to get a random result ([original-roulettepage.tsx](https://www.google.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Share Results**: Share your roulette configuration and results via a URL ([original-roulette/page.tsx(https://www.google.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **User Authentication**: Sign up and log in with an email and password using Supabase Auth ([auth/page.tsx(https://www.google.com/search?q=src/app/%5Blocale%5D/auth/page.tsx)).
* **Data Persistence**: Logged-in users can save their created roulettes to a personal "My Page".
* **My Page**: View, manage, and delete saved roulettes ([mypage/page.tsx](https://www.google.com/searchq=src/app/%5Blocale%5D/mypage/page.tsx), [MyRouletteList.tsx](https://www.google.com/search?q=src/componentsfeatures/mypage/MyRouletteList.tsx)).
* **Image Generation**: Download the roulette result as a PNG image ([original-roulette/page.tsx](https:/www.google.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Multi-language Support**: The interface supports Japanese, English, Spanish, and French, with thedefault language determined by browser settings.

### Future Enhancements

* **Social Login**: Log in using Google or X (formerly Twitter).
* **Template System**:
  * **Public Templates**: Allow users to publish their roulettes as templates for others to use.
  * **Template Search & Filter**: Search for templates by keyword, language, popularity, or creation date.
  * **Fork Templates**: Copy and customize existing templates.
* **Enhanced Sharing**: Real-time sharing of roulette results among multiple users.
* **Advanced Customization**: Additional design options for the roulette wheel and background.

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **State Management:** React Context API
* **BaaS (Backend as a Service):** Supabase (Authentication, PostgreSQL Database)
* **Internationalization (i18n):** react-i18next
* **Deployment:** Vercel

## Directory Structure

This project follows a standard Next.js App Router structure with additional directories for organization.

```
/
├── src/
│   ├── app/
│   │   ├── [locale]/             # Dynamic locale routes
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── original-roulette/ # Roulette creation page
│   │   │   ├── mypage/           # My Page
│   │   │   └── layout.tsx        # Layout for each locale
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global CSS
│   ├── components/
│   │   ├── elements/             # Atomic components (buttons, icons)
│   │   ├── features/             # Feature-specific components (roulette, mypage)
│   │   └── layout/               # Layout components (Header, Footer)
│   ├── i18n/
│   │   ├── locales/              # Translation files (JSON) for each language
│   │   ├── client.ts             # i18next client configuration
│   │   └── settings.ts           # i18next shared settings
│   ├── lib/
│   │   ├── hooks/                # Custom hooks (e.g., useAuth)
│   │   ├── services/             # Supabase communication (e.g., rouletteService.ts)
│   │   └── supabaseClient.ts     # Supabase client initialization
│   ├── store/
│   │   ├── AuthContext.tsx       # Context for authentication state
│   │   └── ModalContext.tsx      # Context for managing modals
│   └── types/
│       ├── index.ts              # Application-specific type definitions
│       └── database.types.ts     # Type definitions auto-generated from Supabase
├── i18n-config.ts                # i18n configuration (supported locales)
├── middleware.ts                 # Middleware for i18n routing
└── next.config.ts                # Next.js configuration file
```

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

* Node.js (v20.9.0 or later recommended)
* npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Development Server

Start the development server with the following command:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result.

## Database Schema

This application uses two main tables in a PostgreSQL database managed by Supabase.

### `profiles` Table

Stores user-specific information, linked to the `auth.users` table.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, FK to `auth.users.id` | User's unique identifier. |
| `username` | `text` | | User's display name. |
| `avatar_url` | `text` | | URL for the user's avatar image. |
| `language` | `text` | | User's preferred language (e.g., 'ja', 'en'). |
| `updated_at` | `timestampz` | NOT NULL | Last update timestamp. |

### `roulettes` Table

Stores the data for each roulette created by users.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | Unique identifier for the roulette. |
| `user_id` | `uuid` | FK to `profiles.id` | The user who created the roulette (can be NULL for guests). |
| `title` | `text` | NOT NULL | The title of the roulette. |
| `items` | `jsonb` | NOT NULL | Array of roulette items, e.g., `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`. |
| `supported_languages` | `text[]` | NOT NULL | Array of supported languages. |
| `created_at` | `timestampz` | NOT NULL | Creation timestamp. |
| `updated_at` | `timestampz` | NOT NULL | Last update timestamp. |

(Note: `description`, `design_settings`, `is_template`, `allow_fork`, `tags`, and `like_count` are planned for future use.)

## Contributing

Contributions are welcome\! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

* This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
  * Icons are provided by [Lucide](https://lucide.dev/).

-----

## 日本語 (Japanese)

**他の言語で読む: [English](#roulette-on-the-web) | [Español](#español-spanish) | [Français](#français-french)**

# Webでルーレット (Roulette on the Web)

これは、Webベースのルーレットアプリケーションのための [Next.js](https://nextjs.org/) プロジェクトです。ユーザーはカスタムルーレットを作成、保存、共有することができます。このアプリケーションは、日常の意思決定からイベントの企画まで、さまざまな目的で直感的かつ楽しく利用できるように設計されています。

## ライブデモ

こちらでアプリケーションを体験できます：**[Webでルーレット](https://webroulette.netlify.app/)**

## ✨ 機能

### 現在の機能

* **ゲスト利用**: アカウントなしで基本的なルーレットの作成と実行が可能です（[original-roulette/page.tsx](src/app/[locale]/original-roulette/page.tsx)）。
* **カスタムルーレット作成**: ユーザーはルーレットの項目、比率（重み）、色を自由に設定できます。
* **ルーレット実行**: スムーズなアニメーションでルーレットを回転させ、ランダムな結果を表示します（[original-roulette/page.tsx](src/app/[locale]/original-roulette/page.tsx)）。
* **結果の共有**: ルーレットの設定と結果をURLで共有できます（[original-roulette/page.tsx](src/app/[locale]/original-roulette/page.tsx)）。
* **ユーザー認証**: Supabase Authを利用して、メールアドレスとパスワードで新規登録とログインができます（[auth/page.tsx](src/app/[locale]/auth/page.tsx)）。
* **データ永続化**: ログインしているユーザーは、作成したルーレットを個人の「マイページ」に保存できます。
* **マイページ**: 保存したルーレットの一覧表示、管理、削除が可能です（[mypage/page.tsx](src/app/[locale]/mypage/page.tsx), [MyRouletteList.tsx](src/components/features/mypage/MyRouletteList.tsx)）。
* **画像生成**: ルーレットの結果をPNG画像としてダウンロードできます（[original-roulette/page.tsx](src/app/[locale]/original-roulette/page.tsx)）。
* **多言語対応**: インターフェースは日本語、英語、スペイン語、フランス語に対応しており、ブラウザの設定に基づいてデフォルト言語が決定されます。

### 今後の拡張機能

* **SNS認証**: GoogleやX（旧Twitter）を使用したログイン。
* **テンプレートシステム**:
  * **公開テンプレート**: ユーザーが作成したルーレットを他のユーザーが利用できるテンプレートとして公開。
  * **テンプレートの検索・フィルタリング**: キーワード、言語、人気順、作成日順でのテンプレート検索。
  * **テンプレートのフォーク**: 既存のテンプレートをコピーしてカスタマイズ。
* **強化された共有機能**: 複数のユーザー間でルーレットの結果をリアルタイムに共有。
* **高度なカスタマイズ**: ルーレットの盤面や背景のデザインオプションの追加。

## 🛠️ 技術スタック

* **フロントエンド:** Next.js (App Router), React, TypeScript
* **スタイリング:** Tailwind CSS
* **アニメーション:** Framer Motion
* **状態管理:** React Context API
* **BaaS (Backend as a Service):** Supabase (Authentication, PostgreSQL Database)
* **国際化 (i18n):** react-i18next
* **デプロイ:** Vercel

## ディレクトリ構成

このプロジェクトは、標準的なNext.js App Routerの構成に従い、整理のために追加のディレクトリを設けています。

```
/
├── src/
│   ├── app/
│   │   ├── [locale]/             # 動的ロケールルート
│   │   │   ├── page.tsx          # ホームページ
│   │   │   ├── original-roulette/ # ルーレット作成ページ
│   │   │   ├── mypage/           # マイページ
│   │   │   └── layout.tsx        # ロケールごとのレイアウト
│   │   ├── layout.tsx            # ルートレイアウト
│   │   └── globals.css           # グローバルCSS
│   ├── components/
│   │   ├── elements/             # ボタンやアイコンなどの最小単位コンポーネント
│   │   ├── features/             # 特定の機能（ルーレット、マイページなど）に関連するコンポーネント群
│   │   └── layout/               # ヘッダー、フッターなどのレイアウトコンポーネント
│   ├── i18n/
│   │   ├── locales/              # 各言語の翻訳ファイル (JSON)
│   │   ├── client.ts             # i18nextクライアント設定
│   │   └── settings.ts           # i18next共通設定
│   ├── lib/
│   │   ├── hooks/                # カスタムフック (useAuthなど)
│   │   ├── services/             # Supabaseとの通信処理 (rouletteService.tsなど)
│   │   └── supabaseClient.ts     # Supabaseクライアントの初期化
│   ├── store/
│   │   ├── AuthContext.tsx       # 認証状態を管理するContext
│   │   └── ModalContext.tsx      # モーダル表示を管理するContext
│   └── types/
│       ├── index.ts              # アプリケーション固有の型定義
│       └── database.types.ts     # Supabaseから自動生成した型定義
├── i18n-config.ts                # 対応ロケールなどのi18n設定
├── middleware.ts                 # i18nルーティング用ミドルウェア
└── next.config.ts                # Next.js設定ファイル
```

## はじめに

ローカル環境でプロジェクトを立ち上げるには、以下の手順に従ってください。

### 前提条件

* Node.js (バージョン 20.9.0 以降を推奨)
* npm, yarn, または pnpm

### インストール

1. **リポジトリをクローン：**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2. **依存関係をインストール：**

    ```bash
    npm install
    # または
    yarn install
    # または
    pnpm install
    ```

### 開発サーバーの実行

以下のコマンドで開発サーバーを起動します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) を開いて結果を確認してください。

## データベーススキーマ

このアプリケーションは、Supabaseで管理されるPostgreSQLデータベースの2つの主要なテーブルを使用しています。

### `profiles` テーブル

ユーザー固有の情報を格納し、`auth.users` テーブルと連携します。

| カラム名 | データ型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, Foreign Key to `auth.users.id` | ユーザーの一意識別子。 |
| `username` | `text` | | ユーザーの表示名。 |
| `avatar_url` | `text` | | ユーザーのアバター画像のURL。 |
| `language` | `text` | | ユーザーの優先言語（例: 'ja', 'en'）。 |
| `updated_at` | `timestampz` | NOT NULL | 最終更新日時。 |

### `roulettes` テーブル

ユーザーが作成したルーレットのデータを格納します。

| カラム名 | データ型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | ルーレットの一意識別子。 |
| `user_id` | `uuid` | Foreign Key to `profiles.id` | ルーレットを作成したユーザー（ゲストの場合はNULL）。 |
| `title` | `text` | NOT NULL | ルーレットのタイトル。 |
| `items` | `jsonb` | NOT NULL | ルーレットの項目配列。例: `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`。 |
| `supported_languages` | `text[]` | NOT NULL | ルーレットが対応する言語の配列。 |
| `created_at` | `timestampz` | NOT NULL | 作成日時。 |
| `updated_at` | `timestampz` | NOT NULL | 最終更新日時。 |

（注意: `description`, `design_settings`, `is_template`, `allow_fork`, `tags`, `like_count` は将来の使用のために計画されています。）

## コントリビューション

コントリビューションを歓迎します！Issueの作成やプルリクエストを気軽に行ってください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 謝辞

* このプロジェクトは [`create-next-app`](https://www.google.com/search?q=%5Bhttps://github.com/vercel/next.js/tree/canary/packagescreate-next-app%5D\(https://github.com/vercel/next.js/tree/canary/packages/create-next-app\)) を使用してブートストラップされました。
* アイコンは [Lucide](https://lucide.dev/) によって提供されています。

-----

## スペイン語 (Spanish)

**Leer en otros idiomas: [English](#roulette-on-the-web) | [日本語](#日本語-japanese) | [Français](#français-french)**

# Ruleta en la Web

Este es un proyecto de [Next.js](https://nextjs.org/) para una aplicación de ruleta basada en la web. Los usuarios pueden crear, guardar y compartir ruletas personalizadas. La aplicación está diseñada para ser intuitiva y divertida para diversos propósitos, desde la toma de decisiones cotidianas hasta la planificación de eventos.

## Demo en vivo

Puedes probar la aplicación aquí: **[Ruleta en la Web](https://webroulette.netlify.app/)**

## ✨ Características

### Funcionalidades actuales

* **Uso como invitado**: Crea y gira una ruleta básica sin necesidad de una cuenta ([original-roulette/page.tsx](https://www.google.com/searchq=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Creación de ruletas personalizadas**: Define libremente los elementos, proporciones (pesos) y colores de la ruleta.
* **Animación de giro**: Gira la ruleta con una animación fluida para obtener un resultado aleatorio ([original-roulette/page.tsx](https://wwwgoogle.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Compartir resultados**: Comparte la configuración de tu ruleta y los resultados a través de una URL ([original-roulette/page.tsx](https:/www.google.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Autenticación de usuarios**: Regístrate e inicia sesión con correo electrónico y contraseña usando Supabase Auth ([auth/page.tsx](https:/www.google.com/search?q=src/app/%5Blocale%5D/auth/page.tsx)).
* **Persistencia de datos**: Los usuarios registrados pueden guardar sus ruletas en una "Mi Página" personal.
* **Mi Página**: Ve, gestiona y elimina tus ruletas guardadas ([mypage/page.tsx](src/app/[locale]/mypage/page.tsx), [MyRouletteList.tsx](src/components/features/mypage/MyRouletteList.tsx)).
* **Generación de imágenes**: Descarga el resultado de la ruleta como una imagen PNG ([original-roulette/page.tsx](src/app/[locale]/original-roulette/page.tsx)).
* **Soporte multilingüe**: La interfaz está disponible en japonés, inglés, español y francés, y el idioma por defecto se determina según la configuración del navegador。

### Mejoras futuras

* **Inicio de sesión social**: Inicia sesión con Google o X (antes Twitter).
* **Sistema de plantillas**:
  * **Plantillas públicas**: Permitir a los usuarios publicar sus ruletas como plantillas para que otros las usen。
  * **Búsqueda y filtro de plantillas**: Buscar plantillas por palabra clave, idioma, popularidad o fecha de creación。
  * **Clonar plantillas**: Copiar y personalizar plantillas existentes。
* **Uso compartido mejorado**: Compartir los resultados de la ruleta en tiempo real entre múltiples usuarios。
* **Personalización avanzada**: Opciones de diseño adicionales para la rueda de la ruleta y el fondo。

## 🛠️ Stack tecnológico

* **Frontend:** Next.js (App Router), React, TypeScript
* **Estilos:** Tailwind CSS
* **Animación:** Framer Motion
* **Gestión de estado:** React Context API
* **BaaS (Backend as a Service):** Supabase (Autenticación, Base de datos PostgreSQL)
* **Internacionalización (i18n):** react-i18next
* **Despliegue:** Vercel

## Estructura de directorios

Este proyecto sigue una estructura estándar de Next.js App Router con directorios adicionales para una mejor organización.

```bash
/
├── src/
│   ├── app/
│   │   ├── [locale]/             # Rutas dinámicas de idioma
│   │   │   ├── page.tsx          # Página de inicio
│   │   │   ├── original-roulette/ # Página de creación de ruleta
│   │   │   ├── mypage/           # Mi Página
│   │   │   └── layout.tsx        # Diseño para cada idioma
│   │   ├── layout.tsx            # Diseño raíz
│   │   └── globals.css           # CSS global
│   ├── components/
│   │   ├── elements/             # Componentes atómicos (botones, iconos)
│   │   ├── features/             # Componentes específicos de funcionalidades (ruleta, mi página)
│   │   └── layout/               # Componentes de diseño (Header, Footer)
│   ├── i18n/
│   │   ├── locales/              # Archivos de traducción (JSON) para cada idioma
│   │   ├── client.ts             # Configuración del cliente i18next
│   │   └── settings.ts           # Configuración compartida de i18next
│   ├── lib/
│   │   ├── hooks/                # Hooks personalizados (ej. useAuth)
│   │   ├── services/             # Comunicación con Supabase (ej. rouletteService.ts)
│   │   └── supabaseClient.ts     # Inicialización del cliente de Supabase
│   ├── store/
│   │   ├── AuthContext.tsx       # Contexto para el estado de autenticación
│   │   └── ModalContext.tsx      # Contexto para gestionar modales
│   └── types/
│       ├── index.ts              # Definiciones de tipos específicas de la aplicación
│       └── database.types.ts     # Definiciones de tipos autogeneradas desde Supabase
├── i18n-config.ts                # Configuración de i18n (idiomas soportados)
├── middleware.ts                 # Middleware para el enrutamiento i18n
└── next.config.ts                # Archivo de configuración de Next.js
```

## Primeros pasos

Sigue estos pasos para obtener una copia local y ponerla en funcionamiento.

### Prerrequisitos

* Node.js (v20.9.0 o posterior recomendado)
* npm, yarn, o pnpm

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

### Ejecución del servidor de desarrollo

Inicia el servidor de desarrollo con el siguiente comando:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) en tu navegador para ver el resultado.

## Esquema de la base de datos

Esta aplicación utiliza dos tablas principales en una base de datos PostgreSQL gestionada por Supabase.

### Tabla `profiles`

Almacena información específica del usuario, vinculada a la tabla `auth.users`.

| Columna | Tipo de dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clave Primaria, FK a `auth.users.id` | Identificador único del usuario. |
| `username` | `text` | | Nombre de usuario para mostrar. |
| `avatar_url` | `text` | | URL de la imagen de avatar del usuario. |
| `language` | `text` | | Idioma preferido del usuario (ej. 'ja', 'en'). |
| `updated_at` | `timestampz` | NOT NULL | Marca de tiempo de la última actualización. |

### Tabla `roulettes`

Almacena los datos de cada ruleta creada por los usuarios.

| Columna | Tipo de dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clave Primaria | Identificador único de la ruleta. |
| `user_id` | `uuid` | FK a `profiles.id` | El usuario que creó la ruleta (puede ser NULL para invitados). |
| `title` | `text` | NOT NULL | El título de la ruleta. |
| `items` | `jsonb` | NOT NULL | Array de elementos de la ruleta, ej. `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`. |
| `supported_languages` | `text[]` | NOT NULL | Array de idiomas soportados. |
| `created_at` | `timestampz` | NOT NULL | Marca de tiempo de creación. |
| `updated_at` | `timestampz` | NOT NULL | Marca de tiempo de la última actualización. |

(Nota: `description`, `design_settings`, `is_template`, `allow_fork`, `tags` y `like_count` están planificados para uso futuro.)

## Contribuciones

¡Las contribuciones son bienvenidas\! No dudes en abrir un issue o enviar un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.

## Agradecimientos

* Este proyecto fue iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
* Los iconos son proporcionados por [Lucide](https://lucide.dev/).

-----

## Français (French)

**Lire dans d'autres langues: [English](#roulette-on-the-web) | [日本語](#日本語-japanese) | [Español](#español-spanish)**

# Roulette sur le Web

Ceci est un projet [Next.js](https://nextjs.org/) pour une application de roulette en ligne. Les utilisateurs peuvent créer, sauvegarder et partager des roulettes personnalisées. L'application est conçue pour être intuitive et amusante pour divers usages, de la prise de décision quotidienne à l'organisation d'événements.

## Démo en direct

Vous pouvez découvrir l'application ici : **[Roulette sur le Web](https://webroulette.netlify.app/)**

## ✨ Fonctionnalités

### Fonctionnalités actuelles

* **Utilisation en tant qu'invité**: Créez et lancez une roulette de base sans compte ([original-roulette/page.tsx](https://www.google.comsearch?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Création de roulette personnalisée**: Définissez librement les éléments, les proportions (poids) et les couleurs de la roue de la roulette.
* **Animation de rotation**: Lancez la roulette avec une animation fluide pour obtenir un résultat aléatoire ([original-roulette/page.tsx(https://www.google.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Partage de résultats**: Partagez la configuration de votre roulette et les résultats via une URL ([original-roulette/page.tsx](https://wwwgoogle.com/search?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Authentification des utilisateurs**: Inscrivez-vous et connectez-vous avec une adresse e-mail et un mot de passe via Supabase Auth ([authpage.tsx](https://www.google.com/search?q=src/app/%5Blocale%5D/auth/page.tsx)).
* **Persistance des données**: Les utilisateurs connectés peuvent sauvegarder leurs roulettes créées sur une "Ma Page" personnelle.
* **Ma Page**: Affichez, gérez et supprimez vos roulettes sauvegardées ([mypage/page.tsx](https://www.google.com/search?q=src/app/%5Blocale%5Dmypage/page.tsx), [MyRouletteList.tsx](https://www.google.com/search?q=src/components/features/mypage/MyRouletteList.tsx)).
* **Génération d'images**: Téléchargez le résultat de la roulette sous forme d'image PNG ([original-roulette/page.tsx](https://www.google.comsearch?q=src/app/%5Blocale%5D/original-roulette/page.tsx)).
* **Support multilingue**: L'interface prend en charge le japonais, l'anglais, l'espagnol et le français, la langue par défaut étant déterminéepar les paramètres du navigateur.

### Améliorations futures

* **Connexion via les réseaux sociaux**: Connexion avec Google ou X (anciennement Twitter).
* **Système de modèles**:
   * **Modèles publics**: Permettre aux utilisateurs de publier leurs roulettes en tant que modèles pour les autres.
   * **Recherche et filtrage de modèles**: Rechercher des modèles par mot-clé, langue, popularité ou date de création.
   * **Duplication de modèles**: Copier et personnaliser des modèles existants.
* **Partage amélioré**: Partage en temps réel des résultats de la roulette entre plusieurs utilisateurs.
* **Personnalisation avancée**: Options de conception supplémentaires pour la roue de la roulette et l'arrière-plan.

## 🛠️ Stack technique

* **Frontend :** Next.js (App Router), React, TypeScript
* **Styling :** Tailwind CSS
* **Animation :** Framer Motion
* **Gestion de l'état :** React Context API
* **BaaS (Backend as a Service) :** Supabase (Authentification, Base de données PostgreSQL)
* **Internationalisation (i18n) :** react-i18next
* **Déploiement :** Vercel

## Structure des répertoires

Ce projet suit une structure standard de Next.js App Router avec des répertoires supplémentaires pour l'organisation.

```
/
├── src/
│   ├── app/
│   │   ├── [locale]/             # Routes dynamiques par langue
│   │   │   ├── page.tsx          # Page d'accueil
│   │   │   ├── original-roulette/ # Page de création de roulette
│   │   │   ├── mypage/           # Ma Page
│   │   │   └── layout.tsx        # Mise en page pour chaque langue
│   │   ├── layout.tsx            # Mise en page racine
│   │   └── globals.css           # CSS global
│   ├── components/
│   │   ├── elements/             # Composants atomiques (boutons, icônes)
│   │   ├── features/             # Composants spécifiques aux fonctionnalités (roulette, ma page)
│   │   └── layout/               # Composants de mise en page (Header, Footer)
│   ├── i18n/
│   │   ├── locales/              # Fichiers de traduction (JSON) pour chaque langue
│   │   ├── client.ts             # Configuration du client i18next
│   │   └── settings.ts           # Paramètres partagés de i18next
│   ├── lib/
│   │   ├── hooks/                # Hooks personnalisés (ex. useAuth)
│   │   ├── services/             # Communication avec Supabase (ex. rouletteService.ts)
│   │   └── supabaseClient.ts     # Initialisation du client Supabase
│   ├── store/
│   │   ├── AuthContext.tsx       # Contexte pour l'état d'authentification
│   │   └── ModalContext.tsx      # Contexte pour la gestion des modales
│   └── types/
│       ├── index.ts              # Définitions de types spécifiques à l'application
│       └── database.types.ts     # Définitions de types auto-générées depuis Supabase
├── i18n-config.ts                # Configuration i18n (langues prises en charge)
├── middleware.ts                 # Middleware pour le routage i18n
└── next.config.ts                # Fichier de configuration de Next.js
```

## Démarrage

Suivez ces étapes pour obtenir une copie locale et la faire fonctionner.

### Prérequis

* Node.js (v20.9.0 ou ultérieure recommandée)
* npm, yarn, ou pnpm

### Installation

1.  **Clonez le dépôt :**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2.  **Installez les dépendances :**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

### Lancement du serveur de développement


Démarrez le serveur de développement avec la commande suivante :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) dans votre navigateur pour voir le résultat.

## Schéma de la base de données

Cette application utilise deux tables principales dans une base de données PostgreSQL gérée par Supabase.

### Table `profiles`

Stocke les informations spécifiques à l'utilisateur, liées à la table `auth.users`.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clé Primaire, FK vers `auth.users.id` | Identifiant unique de l'utilisateur. |
| `username` | `text` | | Nom d'affichage de l'utilisateur. |
| `avatar_url` | `text` | | URL de l'image d'avatar de l'utilisateur. |
| `language` | `text` | | Langue préférée de l'utilisateur (ex. 'ja', 'en'). |
| `updated_at` | `timestampz` | NOT NULL | Horodatage de la dernière mise à jour. |

### Table `roulettes`

Stocke les données de chaque roulette créée par les utilisateurs.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | Identifiant unique de la roulette. |
| `user_id` | `uuid` | FK vers `profiles.id` | L'utilisateur qui a créé la roulette (peut être NULL pour les invités). |
| `title` | `text` | NOT NULL | Le titre de la roulette. |
| `items` | `jsonb` | NOT NULL | Tableau des éléments de la roulette, ex. `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`. |
| `supported_languages` | `text[]` | NOT NULL | Tableau des langues prises en charge. |
| `created_at` | `timestampz` | NOT NULL | Horodatage de création. |
| `updated_at` | `timestampz` | NOT NULL | Horodatage de la dernière mise à jour. |

(Note : `description`, `design_settings`, `is_template`, `allow_fork`, `tags`, et `like_count` sont prévus pour une utilisation future.)

## Contributions

Les contributions sont les bienvenues \! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT.

## Remerciements

* Ce projet a été initialisé avec [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
* Les icônes sont fournies par [Lucide](https://lucide.dev/).
