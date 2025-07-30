# README

## 英語 (English)

**Read in other languages:** [日本語](#日本語-japanese) | [Español](#español-spanish) | [Français](#français-french)

### Roulette on the Web

This is a [Next.js](https://nextjs.org/) project for a web-based roulette application. Users can create, save, and share custom roulettes. This application is designed to be intuitive and fun for various purposes, from everyday decision-making to event planning.

### Live Demo

You can experience the application here: **[Roulette on the Web](https://webroulette.netlify.app/en)**

### ✨ Features

#### Current Features

* **Guest Use**: Create and spin a basic roulette without an account. The configuration can be shared via URL parameters.
* **Custom Roulette Creation**: Freely set items, ratios (weights), and colors for the roulette wheel.
* **Spin Animation**: Spin the roulette with a smooth animation to get a random result.
* **Share Results**: Share your roulette configuration and results via a URL or download the result as a PNG image.
* **User Authentication**: Sign up and log in with an email and password using Supabase Auth.
* **Data Persistence**: Logged-in users can save their created roulettes to a personal "My Page".
* **My Page**: View, manage, edit, and delete saved roulettes. Users can also manage profile information.
* **Template Viewing**: Users can view and use templates created by others.
* **Multi-language Support**: The interface supports Japanese, English, Spanish, and French, with the default language determined by browser settings.

#### Future Enhancements

* **Social Login**: Log in using Google or X (formerly Twitter).
* **Enhanced Template System**:
  * **Template Search & Filter**: Search for templates by keyword, language, popularity, or creation date.
  * **Fork Templates**: Copy and customize existing templates.
* **Enhanced Sharing**: Real-time sharing of roulette results among multiple users.
* **Advanced Customization**: Additional design options for the roulette wheel and background.

### 🛠️ Tech Stack

* **Frontend**: Next.js (App Router), React, TypeScript
* **Styling**: Tailwind CSS
* **Animation**: Framer Motion
* **State Management**: React Context API
* **BaaS (Backend as a Service)**: Supabase (Authentication, PostgreSQL Database)
* **Internationalization (i18n)**: react-i18next
* **Deployment**: Vercel

### Directory Structure

This project follows a standard Next.js App Router structure with additional directories for organization.

```text
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

### Database Schema

This application uses two main tables in a PostgreSQL database managed by Supabase.

#### `profiles` Table

Stores user-specific information, linked to the `auth.users` table.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, FK to `auth.users.id` | User's unique identifier. |
| `username` | `text` | | User's display name. |
| `avatar_url` | `text` | | URL for the user's avatar image. |
| `description` | `text` | | User's profile description. |
| `language` | `text` | NOT NULL | User's preferred language. |
| `updated_at` | `timestampz`| NOT NULL | Last update timestamp. |

#### `roulettes` Table

Stores the data for each roulette created by users.

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | Unique identifier for the roulette. |
| `user_id` | `uuid` | FK to `profiles.id` | The user who created the roulette (can be NULL for guests). |
| `title` | `text` | NOT NULL | The title of the roulette. |
| `description`| `json` | | Multilingual description. |
| `items` | `json` | NOT NULL | Array of roulette items, e.g., `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`. |
| `is_template`| `boolean` | NOT NULL | Whether it's published as a template. |
| `allow_fork` | `boolean` | NOT NULL | Whether forking is allowed. |
| `is_profile_public`| `boolean`| NOT NULL | Whether to display the creator's profile. |
| `supported_languages` | `text[]` | NOT NULL | Array of supported languages. |
| `like_count` | `integer` | NOT NULL | Number of likes. |
| `created_at` | `timestampz`| NOT NULL | Creation timestamp. |
| `updated_at` | `timestampz`| NOT NULL | Last update timestamp. |

### Getting Started

Follow these steps to get a local copy up and running.

#### Prerequisites

* Node.js (v20.9.0 or later recommended)
* npm, yarn, or pnpm

#### Installation

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

#### Running the Development Server

Start the development server with the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### License

This project is licensed under the MIT License.

### Acknowledgments

* This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
* Icons are provided by [Lucide](https://lucide.dev/).

-----

## 日本語 (Japanese)

**他の言語で読む:** [English](#英語-english) | [Español](#español-spanish) | [Français](#français-french)

### Webでルーレット

これは、Webベースのルーレットアプリケーションのための [Next.js](https://nextjs.org/) プロジェクトです。ユーザーはカスタムルーレットを作成、保存、共有することができます。このアプリケーションは、日常の意思決定からイベントの企画まで、さまざまな目的で直感的かつ楽しく利用できるように設計されています。

### ライブデモ

こちらでアプリケーションを体験できます：**[Webでルーレット](https://webroulette.netlify.app/ja)**

### ✨ 機能

#### 現在の機能

* **ゲスト利用**: アカウントなしで基本的なルーレットの作成と実行が可能です。設定はURLパラメータで共有できます。
* **カスタムルーレット作成**: ユーザーはルーレットの項目、比率（重み）、色を自由に設定できます。
* **ルーレット実行**: スムーズなアニメーションでルーレットを回転させ、ランダムな結果を表示します。
* **結果の共有**: ルーレットの設定と結果をURLで共有したり、結果をPNG画像としてダウンロードしたりできます。
* **ユーザー認証**: Supabase Authを利用して、メールアドレスとパスワードで新規登録とログインができます。
* **データ永続化**: ログインしているユーザーは、作成したルーレットを個人の「マイページ」に保存できます。
* **マイページ**: 保存したルーレットの一覧表示、管理、編集、削除が可能です。プロフィールの管理も行えます。
* **テンプレート閲覧**: 他のユーザーが作成したテンプレートを閲覧し、利用することができます。
* **多言語対応**: インターフェースは日本語、英語、スペイン語、フランス語に対応しており、ブラウザの設定に基づいてデフォルト言語が決定されます。

#### 今後の拡張機能

* **SNS認証**: GoogleやX（旧Twitter）を使用したログイン。
* **テンプレートシステムの強化**:
  * **テンプレートの検索・フィルタリング**: キーワード、言語、人気順、作成日順でのテンプレート検索。
  * **テンプレートのフォーク**: 既存のテンプレートをコピーしてカスタマイズ。
* **強化された共有機能**: 複数のユーザー間でルーレットの結果をリアルタイムに共有。
* **高度なカスタマイズ**: ルーレットの盤面や背景のデザインオプションの追加。

### 🛠️ 技術スタック

* **フロントエンド**: Next.js (App Router), React, TypeScript
* **スタイリング**: Tailwind CSS
* **アニメーション**: Framer Motion
* **状態管理**: React Context API
* **BaaS (Backend as a Service)**: Supabase (Authentication, PostgreSQL Database)
* **国際化 (i18n)**: react-i18next
* **デプロイ**: Vercel

### ディレクトリ構成

このプロジェクトは、標準的なNext.js App Routerの構成に従い、整理のために追加のディレクトリを設けています。

```text
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

### データベーススキーマ

このアプリケーションは、Supabaseで管理されるPostgreSQLデータベースの2つの主要なテーブルを使用しています。

#### `profiles` テーブル

ユーザー固有の情報を格納し、`auth.users` テーブルと連携します。

| カラム名 | データ型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key, FK to `auth.users.id` | ユーザーの一意識別子。 |
| `username` | `text` | | ユーザーの表示名。 |
| `avatar_url` | `text` | | ユーザーのアバター画像のURL。 |
| `description`| `text` | | プロフィールの説明文。 |
| `language` | `text` | NOT NULL | ユーザーの優先言語。 |
| `updated_at` | `timestampz`| NOT NULL | 最終更新日時。 |

#### `roulettes` テーブル

ユーザーが作成したルーレットのデータを格納します。

| カラム名 | データ型 | 制約 | 説明 |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Primary Key | ルーレットの一意識別子。 |
| `user_id` | `uuid` | FK to `profiles.id` | ルーレットを作成したユーザー（ゲストの場合はNULL）。 |
| `title` | `text` | NOT NULL | ルーレットのタイトル。 |
| `description`| `json` | | 多言語対応の説明文。 |
| `items` | `json` | NOT NULL | ルーレットの項目配列。例: `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`。 |
| `is_template`| `boolean` | NOT NULL | テンプレートとして公開するか。 |
| `allow_fork` | `boolean` | NOT NULL | 複製を許可するか。 |
| `is_profile_public`| `boolean`| NOT NULL | 作成者のプロフィールを公開するか。 |
| `supported_languages` | `text[]`| NOT NULL | 対応言語の配列。 |
| `like_count` | `integer`| NOT NULL | いいねの数。 |
| `created_at` | `timestampz`| NOT NULL | 作成日時。 |
| `updated_at` | `timestampz`| NOT NULL | 最終更新日時。 |

### はじめに

ローカル環境でプロジェクトを立ち上げるには、以下の手順に従ってください。

#### 前提条件

* Node.js (バージョン 20.9.0 以降を推奨)
* npm, yarn, または pnpm

#### インストール

1. **リポジトリをクローン:**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2. **依存関係をインストール:**

    ```bash
    npm install
    # または
    yarn install
    # または
    pnpm install
    ```

#### 開発サーバーの実行

以下のコマンドで開発サーバーを起動します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

### ライセンス

このプロジェクトはMITライセンスの下で公開されています。

### 謝辞

* このプロジェクトは [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) を使用してブートストラップされました。
* アイコンは [Lucide](https://lucide.dev/) によって提供されています。

-----

## Español (Spanish)

**Leer en otros idiomas:** [English](#英語-english) | [日本語](#日本語-japanese) | [Français](#français-french)

### Ruleta en la Web

Este es un proyecto de [Next.js](https://nextjs.org/) para una aplicación de ruleta basada en la web. Los usuarios pueden crear, guardar y compartir ruletas personalizadas. La aplicación está diseñada para ser intuitiva y divertida para diversos propósitos, desde la toma de decisiones cotidianas hasta la planificación de eventos.

### Demo en vivo

Puedes probar la aplicación aquí: **[Ruleta en la Web](https://webroulette.netlify.app/es)**

### ✨ Características

#### Funcionalidades actuales

* **Uso como invitado**: Crea y gira una ruleta básica sin necesidad de una cuenta. La configuración sepuede compartir mediante parámetros de URL.
* **Creación de ruletas personalizadas**: Define libremente los elementos, proporciones (pesos) y colores dela ruleta.
* **Animación de giro**: Gira la ruleta con una animación fluida para obtener un resultado aleatorio.
* **Compartir resultados**: Comparte la configuración de tu ruleta y los resultados a través de una URL odescarga el resultado como una imagen PNG.
* **Autenticación de usuarios**: Regístrate e inicia sesión con correo electrónico y contraseña usandoSupabase Auth.
* **Persistencia de datos**: Los usuarios registrados pueden guardar sus ruletas en una "Mi Página" personal.
* **Mi Página**: Ve, gestiona, edita y elimina tus ruletas guardadas. También puedes gestionar lainformación de tu perfil.
* **Visualización de plantillas**: Los usuarios pueden ver y utilizar plantillas creadas por otros.
* **Soporte multilingüe**: La interfaz está disponible en japonés, inglés, español y francés, y el idiomapor defecto se determina según la configuración del navegador.

#### Mejoras futuras

* **Inicio de sesión social**: Inicia sesión con Google o X (antes Twitter).
* **Sistema de plantillas mejorado**:
  * **Búsqueda y filtro de plantillas**: Buscar plantillas por palabra clave, idioma, popularidad o fecha de creación.
  * **Clonar plantillas**: Copiar y personalizar plantillas existentes.
* **Uso compartido mejorado**: Compartir los resultados de la ruleta en tiempo real entre múltiples usuarios.
* **Personalización avanzada**: Opciones de diseño adicionales para la rueda de la ruleta y el fondo.

### 🛠️ Stack tecnológico

* **Frontend**: Next.js (App Router), React, TypeScript
* **Estilos**: Tailwind CSS
* **Animación**: Framer Motion
* **Gestión de estado**: React Context API
* **BaaS (Backend as a Service)**: Supabase (Autenticación, Base de datos PostgreSQL)
* **Internacionalización (i18n)**: react-i18next
* **Despliegue**: Vercel

### Estructura de directorios

Este proyecto sigue una estructura estándar de Next.js App Router con directorios adicionales para una mejor organización.

```text
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

### Esquema de la base de datos

Esta aplicación utiliza dos tablas principales en una base de datos PostgreSQL gestionada por Supabase.

#### Tabla `profiles`

Almacena información específica del usuario, vinculada a la tabla `auth.users`.

| Columna | Tipo de dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clave Primaria, FK a `auth.users.id` | Identificador único del usuario. |
| `username` | `text` | | Nombre de usuario para mostrar. |
| `avatar_url` | `text` | | URL de la imagen de avatar del usuario. |
| `description`| `text` | | Descripción del perfil del usuario. |
| `language` | `text` | NOT NULL | Idioma preferido del usuario. |
| `updated_at` | `timestampz`| NOT NULL | Marca de tiempo de la última actualización. |

#### Tabla `roulettes`

Almacena los datos de cada ruleta creada por los usuarios.

| Columna | Tipo de dato | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clave Primaria | Identificador único de la ruleta. |
| `user_id` | `uuid` | FK a `profiles.id` | El usuario que creó la ruleta (puede ser NULL para invitados). |
| `title` | `text` | NOT NULL | El título de la ruleta. |
| `description`| `json` | | Descripción multilingüe. |
| `items` | `json` | NOT NULL | Array de elementos de la ruleta, ej. `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`. |
| `is_template`| `boolean` | NOT NULL | Si está publicada como plantilla. |
| `allow_fork` | `boolean` | NOT NULL | Si se permite la duplicación. |
| `is_profile_public`| `boolean`| NOT NULL | Si se muestra el perfil del creador. |
| `supported_languages` | `text[]`| NOT NULL | Array de idiomas soportados. |
| `like_count` | `integer`| NOT NULL | Número de "me gusta". |
| `created_at` | `timestampz`| NOT NULL | Marca de tiempo de creación. |
| `updated_at` | `timestampz`| NOT NULL | Marca de tiempo de la última actualización. |

### Primeros pasos

Sigue estos pasos para obtener una copia local y ponerla en funcionamiento.

#### Prerrequisitos

* Node.js (v20.9.0 o posterior recomendado)
* npm, yarn, o pnpm

#### Instalación

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2. **Instala las dependencias:**

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

#### Ejecución del servidor de desarrollo

Inicia el servidor de desarrollo con el siguiente comando:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Licencia

Este proyecto está bajo la Licencia MIT.

### Agradecimientos

* Este proyecto fue iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
* Los iconos son proporcionados por [Lucide](https://lucide.dev/).

-----

## Français (French)

**Lire dans d'autres langues:** [English](#英語-english) | [日本語](#日本語-japanese) | [Español](#español-spanish)

### Roulette sur le Web

Ceci est un projet [Next.js](https://nextjs.org/) pour une application de roulette en ligne. Les utilisateurs peuvent créer, sauvegarder et partager des roulettes personnalisées. L'application est conçue pour être intuitive et amusante pour divers usages, de la prise de décision quotidienne à l'organisation d'événements.

### Démo en direct

Vous pouvez découvrir l'application ici : **[Roulette sur le Web](https://webroulette.netlify.app/fr)**

### ✨ Fonctionnalités

#### Fonctionnalités actuelles

* **Utilisation en tant qu'invité**: Créez et lancez une roulette de base sans compte. La configuration peut être partagée via des paramètres d'URL.
* **Création de roulette personnalisée**: Définissez librement les éléments, les proportions (poids) et les couleurs de la roue de la roulette.
* **Animation de rotation**: Lancez la roulette avec une animation fluide pour obtenir un résultat aléatoire.
* **Partage de résultats**: Partagez la configuration de votre roulette et les résultats via une URL ou téléchargez le résultat sous forme d'image PNG.
* **Authentification des utilisateurs**: Inscrivez-vous et connectez-vous avec une adresse e-mail et un mot de passe via Supabase Auth.
* **Persistance des données**: Les utilisateurs connectés peuvent sauvegarder leurs roulettes créées sur une "Ma Page" personnelle.
* **Ma Page**: Affichez, gérez, modifiez et supprimez vos roulettes sauvegardées. Vous pouvez également gérer les informations de votre profil.
* **Visualisation de modèles**: Les utilisateurs peuvent voir et utiliser des modèles créés par d'autres.
* **Support multilingue**: L'interface prend en charge le japonais, l'anglais, l'espagnol et le français, la langue par défaut étant déterminée par les paramètres du navigateur.

#### Améliorations futures

* **Connexion via les réseaux sociaux**: Connexion avec Google ou X (anciennement Twitter).
* **Système de modèles amélioré**:
  * **Recherche et filtrage de modèles**: Rechercher des modèles par mot-clé, langue, popularité ou date de création.
  * **Duplication de modèles**: Copier et personnaliser des modèles existants.
* **Partage amélioré**: Partage en temps réel des résultats de la roulette entre plusieurs utilisateurs.
* **Personnalisation avancée**: Options de conception supplémentaires pour la roue de la roulette et l'arrière-plan.

### 🛠️ Stack technique

* **Frontend**: Next.js (App Router), React, TypeScript
* **Styling**: Tailwind CSS
* **Animation**: Framer Motion
* **Gestion de l'état**: React Context API
* **BaaS (Backend as a Service)**: Supabase (Authentification, Base de données PostgreSQL)
* **Internationalisation (i18n)**: react-i18next
* **Déploiement**: Vercel

### Structure des répertoires

Ce projet suit une structure standard de Next.js App Router avec des répertoires supplémentaires pour l'organisation.

```text
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

### Schéma de la base de données

Cette application utilise deux tables principales dans une base de données PostgreSQL gérée par Supabase.

#### Table `profiles`

Stocke les informations spécifiques à l'utilisateur, liées à la table `auth.users`.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clé Primaire, FK vers `auth.users.id` | Identifiant unique de l'utilisateur. |
| `username` | `text` | | Nom d'affichage de l'utilisateur. |
| `avatar_url` | `text` | | URL de l'image d'avatar de l'utilisateur. |
| `description`| `text` | | Description du profil de l'utilisateur. |
| `language` | `text` | NOT NULL | Langue préférée de l'utilisateur. |
| `updated_at` | `timestampz`| NOT NULL | Horodatage de la dernière mise à jour. |

#### Table `roulettes`

Stocke les données de chaque roulette créée par les utilisateurs.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Clé Primaire | Identifiant unique de la roulette. |
| `user_id` | `uuid` | FK vers `profiles.id` | L'utilisateur qui a créé la roulette (peut être NULL pour les invités). |
| `title` | `text` | NOT NULL | Le titre de la roulette. |
| `description`| `json` | | Description multilingue. |
| `items` | `json` | NOT NULL | Tableau des éléments de la roulette, ex. `[{ "name": "A", "ratio": 1, "color": "#ff0000" }]`. |
| `is_template`| `boolean` | NOT NULL | Si elle est publiée comme modèle. |
| `allow_fork` | `boolean` | NOT NULL | Si la duplication est autorisée. |
| `is_profile_public`| `boolean`| NOT NULL | Si le profil du créateur doit être affiché. |
| `supported_languages` | `text[]`| NOT NULL | Tableau des langues prises en charge. |
| `like_count` | `integer`| NOT NULL | Nombre de "j'aime". |
| `created_at` | `timestampz`| NOT NULL | Horodatage de création. |
| `updated_at` | `timestampz`| NOT NULL | Horodatage de la dernière mise à jour. |

### Démarrage

Suivez ces étapes pour obtenir une copie locale et la faire fonctionner.

#### Prérequis

* Node.js (v20.9.0 ou ultérieure recommandée)
* npm, yarn, ou pnpm

#### Installation

1. **Clonez le dépôt :**

    ```bash
    git clone https://github.com/tomoki013/roulette.git
    cd roulette
    ```

2. **Installez les dépendances :**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

#### Lancement du serveur de développement

Démarrez le serveur de développement avec la commande suivante :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

### Licence

Ce projet est sous licence MIT.

### Remerciements

* Ce projet a été initialisé avec [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
* Les icônes sont fournies par [Lucide](https://lucide.dev/).
