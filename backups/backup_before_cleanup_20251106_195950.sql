--
-- PostgreSQL database dump
--

\restrict LeZJSB5Qg9xVEMlwqX87B6uPcBmXzUyma79bBIchUm5V6kgMgBaooVMGsELmFzi

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ChallengeState; Type: TYPE; Schema: public; Owner: avnadmin
--

CREATE TYPE public."ChallengeState" AS ENUM (
    'pending',
    'assigned',
    'evaluated'
);


ALTER TYPE public."ChallengeState" OWNER TO avnadmin;

--
-- Name: ChallengeType; Type: TYPE; Schema: public; Owner: avnadmin
--

CREATE TYPE public."ChallengeType" AS ENUM (
    'immediate',
    'interview',
    'collaborative',
    'timed'
);


ALTER TYPE public."ChallengeType" OWNER TO avnadmin;

--
-- Name: Level; Type: TYPE; Schema: public; Owner: avnadmin
--

CREATE TYPE public."Level" AS ENUM (
    'native',
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
);


ALTER TYPE public."Level" OWNER TO avnadmin;

--
-- Name: QuestionType; Type: TYPE; Schema: public; Owner: avnadmin
--

CREATE TYPE public."QuestionType" AS ENUM (
    'multiple_choice',
    'simple_choice',
    'true_false',
    'open_ended',
    'code'
);


ALTER TYPE public."QuestionType" OWNER TO avnadmin;

--
-- Name: Seniority; Type: TYPE; Schema: public; Owner: avnadmin
--

CREATE TYPE public."Seniority" AS ENUM (
    'trainee',
    'junior',
    'middle',
    'senior'
);


ALTER TYPE public."Seniority" OWNER TO avnadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cell; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Cell" (
    id text NOT NULL,
    name text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    module_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Cell" OWNER TO avnadmin;

--
-- Name: Challenge; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Challenge" (
    id text NOT NULL,
    calification integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    quiz_id text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public."Challenge" OWNER TO avnadmin;

--
-- Name: HardSkill; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."HardSkill" (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."HardSkill" OWNER TO avnadmin;

--
-- Name: Language; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Language" (
    id text NOT NULL,
    language text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Language" OWNER TO avnadmin;

--
-- Name: LanguageUser; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."LanguageUser" (
    id text NOT NULL,
    language_id text NOT NULL,
    user_id text NOT NULL,
    level public."Level" NOT NULL
);


ALTER TABLE public."LanguageUser" OWNER TO avnadmin;

--
-- Name: Module; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Module" (
    id text NOT NULL,
    name text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Module" OWNER TO avnadmin;

--
-- Name: Question; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Question" (
    id text NOT NULL,
    question text NOT NULL,
    seniority public."Seniority" NOT NULL,
    type public."QuestionType" NOT NULL,
    options text[],
    correct_option integer[],
    explanation text,
    link text,
    is_active boolean NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    quiz_id text NOT NULL
);


ALTER TABLE public."Question" OWNER TO avnadmin;

--
-- Name: Quiz; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Quiz" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    cell_id text NOT NULL,
    seniority public."Seniority" NOT NULL,
    challenge_type public."ChallengeType" NOT NULL,
    max_time integer,
    created_by_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Quiz" OWNER TO avnadmin;

--
-- Name: Role; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Role" (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."Role" OWNER TO avnadmin;

--
-- Name: RoleUser; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."RoleUser" (
    id text NOT NULL,
    role_id text NOT NULL,
    user_id text NOT NULL,
    seniority public."Seniority" NOT NULL
);


ALTER TABLE public."RoleUser" OWNER TO avnadmin;

--
-- Name: SocialNetwork; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."SocialNetwork" (
    id text NOT NULL,
    platform text NOT NULL,
    url text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."SocialNetwork" OWNER TO avnadmin;

--
-- Name: SoftSkill; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."SoftSkill" (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone
);


ALTER TABLE public."SoftSkill" OWNER TO avnadmin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    first_name text NOT NULL,
    last_name text,
    gender text,
    photo text,
    phone_number text,
    timezone text,
    is_active boolean DEFAULT true NOT NULL,
    is_staff boolean DEFAULT false NOT NULL,
    is_superuser boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone,
    last_login timestamp(3) without time zone,
    birthdate timestamp(3) without time zone,
    "resetPasswordExpires" timestamp(3) without time zone,
    "resetPasswordToken" text,
    "emailConfirmationToken" text,
    "emailConfirmed" boolean DEFAULT false NOT NULL,
    "emailConfirmationExpires" timestamp(3) without time zone
);


ALTER TABLE public."User" OWNER TO avnadmin;

--
-- Name: _HardSkillUser; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."_HardSkillUser" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_HardSkillUser" OWNER TO avnadmin;

--
-- Name: _SocialNetworkUser; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."_SocialNetworkUser" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_SocialNetworkUser" OWNER TO avnadmin;

--
-- Name: _SoftSkillUser; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."_SoftSkillUser" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_SoftSkillUser" OWNER TO avnadmin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO avnadmin;

--
-- Data for Name: Cell; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Cell" (id, name, is_active, module_id, created_at, updated_at) FROM stdin;
989d898a-3ca8-453c-ab2e-1cc4f9510b8c	PM	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 13:56:46.641	2024-10-15 13:56:46.641
d5881ba6-4866-403f-8b6e-a8b45298a394	Automation	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-11-14 16:33:12.134	2024-11-14 16:33:12.134
5901518b-f699-49ce-a034-5d0fe2609345	Tester QA	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 13:55:54.321	2025-08-26 00:14:54.278
4fd8e01a-5557-47e4-8906-e98618c4dc24	Publicidad1	t	f18f3f3b-1b70-4c91-8397-76a4304f6535	2024-11-25 19:18:41.259	2024-11-25 20:28:36.259
09f6b583-a6c5-4517-aeb5-698c8089e334	Publicidad	t	f18f3f3b-1b70-4c91-8397-76a4304f6535	2024-11-25 20:36:05.596	2024-11-25 20:36:05.596
305e2fc8-b898-48f7-b5ea-75fcdb52b17f	FrontEnd	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 13:56:06.807	2024-12-07 16:30:00.555
fe378504-4a60-4de9-8204-e42ca27167d3	BackEnd	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 13:56:28.289	2024-12-07 16:30:15
97928084-2555-405c-b6fa-c8fcbd47c3d5	Diseño UX/UI	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 13:55:32.745	2024-12-07 16:50:05.34
6c88f9e9-ee68-423f-bbf9-cb8af183924f	Fullstack	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 00:14:57.352	2024-12-07 16:50:16.317
03b75deb-ff54-4819-935b-3937e529a4a2	Eliminar célula	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-11-16 01:45:55.533	2024-12-09 21:42:36.44
a3fb96e1-b96e-440b-9721-11f4022d1493	Eliminar 	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-21 17:22:45.956	2024-12-09 21:42:52.027
64314184-37a7-4abf-be96-68e88d41263f	Eliminar célula2	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-12-09 20:54:49.621	2024-12-09 21:43:21.4
c4d33b62-b4a4-46b3-ad4f-15471b7fd456	Scrum	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2024-10-15 13:57:41.873	2025-08-12 20:41:14.423
33145d85-22a7-4c84-a140-1bb845b8bf1a	TestCelula1	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:28:41.708	2025-08-13 21:28:41.708
35d69f37-580a-4c09-94b4-b945e1028df7	TestCelula1	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:28:42.429	2025-08-13 21:28:42.429
915e144b-6b29-4230-b19f-95b174c0e290	   	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:30:01.365	2025-08-13 21:30:01.365
9f920544-fd3d-4559-92df-b4072a41a81a	   	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:30:40.066	2025-08-13 21:30:40.066
70d6fb24-0be6-450d-8635-1f20de7d2b2d	Tester QA	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:32:03.941	2025-08-13 21:32:03.941
ec2b2093-0b25-4791-a923-e11a33b68e9a	Tester QA	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:32:04.434	2025-08-13 21:32:04.434
4f884a11-75d8-43b1-b757-67a918bb053b	Tester QA	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:32:04.632	2025-08-13 21:32:04.632
884998d7-f403-42ae-9bc8-d129f65cf70c	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:17.533	2025-08-13 21:37:17.533
fb8ac560-6a01-4351-9f34-04359bf39d1a	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:17.03	2025-08-13 21:37:17.03
545b923f-fc55-4180-874f-5c4831b33ba5	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:16.904	2025-08-13 21:37:16.904
6bfd2713-9579-4838-a252-fea7f9f71fb4	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:19.35	2025-08-13 21:37:19.35
43f8a219-a32e-4b2d-918b-5525d171a7e1	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:17.744	2025-08-13 21:37:17.744
41246093-a453-4d8c-92b4-d61762316ad2	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:17.24	2025-08-13 21:37:17.24
b8889e0c-be36-4792-b43c-2bd7dab365f0	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:18.03	2025-08-13 21:37:18.03
be2e10a2-bca7-4f61-8633-67f7f9793252	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:18.238	2025-08-13 21:37:18.238
869a52bc-dc65-4e93-865c-24368c1f6be3	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:18.529	2025-08-13 21:37:18.529
5721a734-d71b-43ab-a6e3-3a9295941fca	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:19.471	2025-08-13 21:37:19.471
87abf1f0-3b16-4e5a-8043-9d0839007bf4	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:19.63	2025-08-13 21:37:19.63
7cad5145-ea3b-4ee0-a5ac-14acb867020a	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:19.756	2025-08-13 21:37:19.756
08474652-8a19-4202-b71b-1bfed3e768fc	Alisson	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-13 21:37:19.876	2025-08-13 21:37:19.876
5933bc88-e4c8-4018-912e-2c922ad0eb50	Scrum	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-14 23:30:35.338	2025-08-14 23:30:35.338
2f057bf2-69f0-44ce-9cd7-c775426d557f	Scrum	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-14 23:30:36.184	2025-08-14 23:30:36.184
6743c93e-f5a6-4819-a178-81ce70c52618	QA junior	t	afd0d129-8c17-47e9-a67e-3a9dc12b3915	2025-08-15 21:22:41.666	2025-08-15 21:22:41.666
645a1b14-3e79-411b-9f36-13850f5d1095	QA junior	t	afd0d129-8c17-47e9-a67e-3a9dc12b3915	2025-08-15 21:22:41.882	2025-08-15 21:22:41.882
d8e9d9c5-e412-4fac-b4a7-870dc3697e92	QA junior	t	afd0d129-8c17-47e9-a67e-3a9dc12b3915	2025-08-15 21:22:42.679	2025-08-15 21:22:42.679
c8e3743a-fc17-4431-9e89-e840f1188bdb	QA junior	t	afd0d129-8c17-47e9-a67e-3a9dc12b3915	2025-08-15 21:22:42.89	2025-08-15 21:22:42.89
b67aa029-5337-4468-adc7-c534c19e40a1	Celula Deura	t	87c90969-d033-40d0-bae8-35b461fde2d1	2025-08-18 21:41:45.45	2025-08-18 21:41:45.45
286aa2fe-1890-4746-bcf1-ea134ed97fa5	FrontEnd	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-19 03:07:28.782	2025-08-19 03:07:28.782
a30ecc71-1526-4825-8080-b2dc91a5b74a	FrontEnd	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-19 03:07:35.922	2025-08-19 03:07:35.922
da29e70c-bbe8-4728-85f8-677bcf577b2a	   	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-19 14:19:35.457	2025-08-19 14:19:35.457
405ea709-ca64-4113-8a08-dcf7b4ef4985	   	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-19 14:20:23.035	2025-08-19 14:20:23.035
a4073994-23e2-4f22-a973-20bdc8fe2034	QA junior	t	afb06142-bb8c-445a-a224-4c87bf12ff59	2025-08-15 20:28:28.12	2025-09-08 16:43:27.832
f5f414da-3cab-4a2b-b23b-d5ea02dfb40d	Tester	t	a30d6451-b9df-4d01-bf17-92131108558e	2025-10-21 22:03:07.865	2025-10-21 22:03:07.865
dc3e2339-444a-4898-8fb4-0e420536cb62	Líder	t	a30d6451-b9df-4d01-bf17-92131108558e	2025-10-21 22:03:18.116	2025-10-21 22:03:18.116
e9120e45-ff45-491d-ae46-779167530f20	Prueba de fuego	t	2e1155c0-2568-48b8-bd4f-0e3a95a741e1	2025-11-06 11:24:29.292	2025-11-06 11:24:29.292
\.


--
-- Data for Name: Challenge; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Challenge" (id, calification, created_at, updated_at, quiz_id, user_id) FROM stdin;
\.


--
-- Data for Name: HardSkill; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."HardSkill" (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: Language; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Language" (id, language, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: LanguageUser; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."LanguageUser" (id, language_id, user_id, level) FROM stdin;
\.


--
-- Data for Name: Module; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Module" (id, name, is_active, created_at, updated_at) FROM stdin;
87c90969-d033-40d0-bae8-35b461fde2d1	Desarrollo 	t	2024-12-09 16:38:00.094	2024-12-09 20:54:23.76
2c447e8c-ed4e-4853-8d32-df83f92dd650	Modulo Test	t	2025-08-09 00:38:37.414	2025-08-09 00:38:37.414
c2b158ce-5d48-413b-af19-047de9a8d2e5	test	t	2025-08-12 20:02:52.007	2025-08-12 20:02:52.007
afb06142-bb8c-445a-a224-4c87bf12ff59	Sistemas	t	2024-10-15 00:14:49.265	2025-08-12 20:13:19.572
afd0d129-8c17-47e9-a67e-3a9dc12b3915	Puebas	t	2025-08-15 20:28:27.831	2025-08-15 20:28:27.831
f18f3f3b-1b70-4c91-8397-76a4304f6535	Marketing	t	2024-11-23 16:40:12.626	2025-08-18 21:42:21.714
59ad2032-4895-4fcd-927d-47e148d8fd68	Programación-prueba	t	2025-08-20 14:08:45.136	2025-08-20 14:08:45.136
9caddf0e-748d-4f15-8f5c-f1a75bf6279a	Prueba	t	2025-08-20 14:08:47.133	2025-08-20 14:08:47.133
42f0a90e-24b9-418f-b6c5-ba796e0ff190	   	t	2025-08-20 14:08:45.143	2025-08-20 14:08:45.143
14502384-4af5-4c6f-b255-a09cf9291249	Nuevo módulo	t	2025-08-20 14:08:47.133	2025-08-20 14:10:37.487
a30d6451-b9df-4d01-bf17-92131108558e	QA Analyst	t	2025-10-21 22:02:44.809	2025-10-21 22:02:44.809
2e1155c0-2568-48b8-bd4f-0e3a95a741e1	Probando	t	2025-11-06 11:24:14.997	2025-11-06 11:24:14.997
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Question" (id, question, seniority, type, options, correct_option, explanation, link, is_active, created_at, updated_at, quiz_id) FROM stdin;
f620d4ba-41e4-4159-b4c0-dfa7ce7003c7	¿Cuál es el principal objetivo del testing en el desarrollo de software?	junior	simple_choice	{"Garantizar que no hay bugs en el sistema.","Identificar defectos y asegurar que el software cumple con los requerimientos. ","Ninguna de las opciones son correctas."}	{1}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
7730538a-f7db-4745-b76d-dd55bdeb404c	¿Qué describe mejor una prueba de caja negra?	junior	simple_choice	{"Pruebas basadas en el conocimiento interno del código.","Pruebas basadas en la funcionalidad sin conocer la estructura interna del sistema."}	{1}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
c18acb0a-a87b-47f2-8943-7fe740212e84	¿Cuál es la prioridad principal de un bug crítico?	junior	simple_choice	{"Impacta las funciones principales del sistema y debe corregirse inmediatamente.","No afecta la funcionalidad principal y puede resolverse en futuras actualizaciones."}	{1}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
2315f0ec-290b-4ebd-b731-085bf6c3d6f4	¿Qué herramienta se utiliza comúnmente para gestionar tareas y bugs?	junior	simple_choice	{JIRA.,Selenium.}	{0}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
7853ee2a-1f93-4924-b44a-472c507b1a42	¿Qué se valida durante las pruebas funcionales?	junior	simple_choice	{" El diseño y la estética de la interfaz.","Que el sistema cumple con los requerimientos establecidos."}	{1}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
588c8bd3-b20e-46d2-bf26-4ce983ca2bb7	¿Cuál es el enfoque principal de las pruebas de carga?	junior	simple_choice	{"Determinar cómo el sistema maneja múltiples usuarios simultáneamente."," Evaluar la precisión de los cálculos del sistema."}	{0}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
463bced9-47be-48d7-bfee-ab25192897d6	¿Qué es un caso de prueba?	junior	simple_choice	{"Un plan que detalla qué probar, cómo probarlo y el resultado esperado.","Una lista de errores encontrados en el sistema."}	{0}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
2d74e19d-c6b5-482e-97ab-df9d65e54e88	En un entorno ágil, el QA debe participar en:	junior	simple_choice	{"Sólo la ejecución de pruebas al final del sprint.","Todo el ciclo del sprint, desde planificación hasta ejecución de pruebas."}	{1}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
47a1ba9f-5b05-4afe-841c-106e603dfd99	¿Qué describe mejor el término "regresión"?	junior	simple_choice	{"Nuevos errores que aparecen después de modificar el sistema.","Pruebas realizadas para mejorar la usabilidad del sistema."}	{0}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
2e4d55b6-cf16-42ec-97c0-0c802805d22c	¿Qué debe incluir un reporte de bug?	junior	simple_choice	{"Sólo una descripción breve del problema.","Una descripción, pasos para reproducirlo, resultado esperado y evidencias."}	{1}			t	2024-12-09 02:09:48.012	2024-12-09 02:09:48.012	8e24ea4a-41fb-452d-a974-d8cf81910587
37231d3d-e080-4739-b6ab-99ad149a41d7	POM Es	junior	simple_choice	{"Una estrategia","Una Metodologia ","Un Modelo de Arquitectura para Test","La unica forma de estructuturar test Automaticos"}	{2}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
940043e8-a751-41d6-a066-1951273b94a3	pregunta 2	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
04adfa72-41a8-489a-8462-991e5f58dfb8	Preg 2	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
d21840f7-2681-48f3-ad79-17a2215b9ef0	preg 3	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
c684bde2-b2f7-488b-8f20-94b1c7f25dd2	Preg 4	junior	multiple_choice	{"Resp 1","Resp 2","Resp 3","Resp 4"}	{0,2}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
46f148ca-f780-4723-9966-5d4a4e2540ea	Preg 6	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
588809ce-d1d6-42a0-88e2-3d2b00b4ffd2	Preg7	junior	simple_choice	{Resp1,Resp2}	{1}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
2137642a-2a92-450e-824c-06716f1b5e09	Variable	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
34bafb35-045a-4b5d-b60d-4f6c86f3a058	Preg 1	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
09e74da7-d299-45df-a3e1-26eb0705e99a	Preg 2	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
fa0dd8ab-7a50-48fb-8b11-cad8f437c2ae	Preg 3	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
636ddd1c-69a7-4a9b-9bca-16b1ddd66156	Preg 4	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
7c9a7c17-9051-47d7-9f90-a82a8b8a9158	Preg 5	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
a79890a2-502b-4bc3-8699-6364c398a3f4	Preg 6	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
5099d284-bf0a-468e-885e-e40331b6c140	Preg 7	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
2422ffe5-dee7-4d66-9605-5aa87f104238	Preg 8	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
3ff19f18-e6a1-4446-a121-0f05b1ce62a5	Preg 9	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
25496358-6eb7-426d-9184-8ef6295d674e	Preg 10	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-06 22:37:05.123	2025-09-06 22:37:05.123	03376b31-fbe7-4f1e-84c2-c0a20c828043
543ef089-1b5e-4fe4-9fa5-bae3359bb9ec	Scripts	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
404755c6-b759-43a1-8de5-8d9af95d2ef2	Preg 10	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	12faa328-c814-493a-b405-fe2f38e780ec
79ce56c8-b71b-4be3-a8ae-f6ac43c20306	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
7c1ffa47-b159-4432-a4f4-bc0638921066	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
830ad799-3c70-4c3e-bc10-91b5c2fc62fa	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
1425bef0-bb94-4f73-90b2-05ac15149995	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
8b1ff265-e4aa-41d7-aadd-443e87c8d710	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
9a8ff9a9-f90e-4a8f-9540-d62695c55a37	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
acb357ec-7090-445d-88fd-70632bb6957f	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
7b65c99f-a2f6-481e-b668-b3224ec502a3	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
27d15884-a95e-4c35-a70a-b9f486eea318	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
d99aaac8-3be9-4393-a955-06738a1334df	¿Qué es el aseguramiento de calidad (QA) en software	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	c5376752-6def-490d-930a-1c9b72e93259
fc50bcf2-e901-486a-9c6d-ac14f7c2d7f6	qdqwd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
d7c4caee-e20b-4c85-8898-5365bd8180e1	qdwqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
8b1b8036-b4a6-4dfc-abea-f39730c3ef08	qdwqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
df2dd2b3-e9a8-486f-ae66-9057e07dbb15	qwdwqdqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
77261837-c048-4ae1-9f60-579d0131fbec	¿Qué es el aseguramiento de calidad (QA) en software?	trainee	simple_choice	{"Un proceso para detectar bugs después del lanzamiento.","Un enfoque para prevenir defectos durante el desarrollo.","La fase de ejecución de pruebas manuales.","La documentación técnica del código."}	{1}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
d7014fcc-ec30-437d-8d6b-ac6231f3d784	¿Cuál es el objetivo principal de las pruebas de software?	trainee	simple_choice	{"Mejorar el rendimiento del equipo de desarrollo.","Encontrar y corregir defectos antes de la entrega.","Reducir el costo del hardware.","Aumentar la velocidad de desarrollo."}	{1}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
12c2958e-0d25-40a8-88da-b159bf58e61d	¿Qué tipo de prueba verifica la funcionalidad de un módulo individual?	trainee	simple_choice	{"Pruebas de integración.","Pruebas de sistema.","Pruebas unitarias.","Pruebas de regresión."}	{2}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
2a1fa277-5914-443c-9a28-ecb0a29a04ef	¿Qué documento describe qué se probará en un proyecto de software?	trainee	simple_choice	{"Plan de proyecto.","Casos de prueba.","Plan de pruebas.","Especificación de requisitos."}	{2}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
d3fd5930-c52b-44af-a817-3972b9d5acd2	Que documento define el enfoque, recursos y calendario de las pruebas?	junior	multiple_choice	{"Caso de de prueba","informe de defectos","plan de pruebas","Cronograma de pruebas"}	{2,3}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
8ad4be06-ebcd-4766-bc71-fee4167eb365	preg 1	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
256c4ebf-0b1e-4ea9-a662-8c4607ae51ff	preg 2	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
12db2e29-883b-4e1e-a063-31ea5a62027a	pregunta 1	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
7cbc269b-9557-4ed8-95b1-15e45d354cd2	nb hf gh g	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
58816c1a-ac7b-4c2c-9e38-007565bcae0e	pregunta 1	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
ab1d3d93-b6b1-4874-8011-427ca6f0e589	Cual de las siguientes no es un tipo de prueba funcional 	junior	multiple_choice	{"Prueba de integración","Prueba de rendimiento","Prueba de carga","Prueba de sistema"}	{2,1}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
970e24a2-d543-41b8-92f0-8762370f0b33	Cual de las siguientes pruebas se realiza primero	junior	simple_choice	{"Pruebas de integración","Pruebas unitarias"}	{1}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
836f42f4-c3d6-4d5f-a762-77afe58bc93c	Que es un defecto 	junior	simple_choice	{"Una desviación entre el comportamiento esperado y el real del sistema ","Una  mala practica de programación"}	{0}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
8da280cc-678b-4761-adb0-642aff88834e	El propósito principal de las pruebas de software es encontrar errores 	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
b3b6e1b0-8d21-4d05-833c-982d111e495a	Un caso de prueba debe contener únicamente el resultado esperado	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
9fee971c-6d9e-4bb6-9646-b8d9415bbe8a	Las pruebas exploratorias requieren una documentación exhaustiva antes de ejecutarse  	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
e617609c-6a44-4999-9123-7cfd44b977fa	El ciclo de vida de testing comienza con el análisis de requerimientos 	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
ef3fffb9-8f30-4bd2-a358-d389601c7ddb	Que es selenium	junior	simple_choice	{"Un lenguaje de programación ","Una herramienta de automatización de pruebas para aplicaciones web"}	{1}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
b7df3e67-3c26-49e5-96ec-e2aaab085126	Las pruebas de regresión se hacen solo una vez por proyecto	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
9df2b99a-9617-401f-972d-75ce7f528bab	Las pruebas de caja blanca requieren conocimiento del código fuente	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-28 21:23:20.113	2025-08-28 21:23:20.113	8be7132f-8bd5-4d64-96f6-9909a1bdeb57
f40028e5-6429-41f7-a6db-1ccf78cde8fa	Hoy es la Demo 2 de Challenge TrainIT	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
04336e5b-e89d-45a7-a5c8-77f0227ef898	pregunta 1	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
ba66342a-bc76-47bf-ba11-b312e1f5d2d2	¿Cuál es el rol principal de un Product Manager Trainee en una empresa?	junior	simple_choice	{"Administrar los recursos financieros.","Apoyar en la gestión y desarrollo de productos bajo supervisión de un Product Manager. ","Dirigir el equipo de ventas.","Opción 4.","Opción 5.","Opción 6."}	{1}	string	string	t	2024-11-06 21:38:57.935	2024-11-06 21:38:57.935	3c40732d-6ed4-4a69-95ce-756e128a6c5c
5bef573f-9412-4cd5-a560-3bcd9ee6a95f	¿Qué tipo de análisis es parte del trabajo de un Product Manager Trainee?	junior	simple_choice	{"Análisis de competencia. ","Auditoría financiera.","Planificación de recursos humanos."}	{0}	string	string	t	2024-11-06 21:40:07.333	2024-11-06 21:40:07.333	3c40732d-6ed4-4a69-95ce-756e128a6c5c
bbd17ad2-c090-4fd6-bdec-07170e7cefc6	¿Cuál de las siguientes actividades puede realizar un Product Manager Trainee para entender mejor el mercado?	junior	simple_choice	{"Realizar encuestas y entrevistas a usuarios. ","Auditar las finanzas de la empresa.","Supervisar la logística de los productos"}	{0}	string	string	t	2024-11-06 21:43:03.389	2024-11-06 21:43:03.389	3c40732d-6ed4-4a69-95ce-756e128a6c5c
29559e1c-4109-4d0c-9908-84ca49e0bd28	¿Cuál de las siguientes es una tarea que realiza un Product Manager Trainee?	junior	simple_choice	{"Supervisar todo el equipo de desarrollo.","Colaborar con el equipo de desarrollo en la definición de requerimientos. ","Ejecutar el control de calidad del producto."}	{1}	string	string	t	2024-11-06 21:52:21.538	2024-11-06 21:52:21.538	3c40732d-6ed4-4a69-95ce-756e128a6c5c
444793f2-0c98-432c-9df4-f55c51267702	¿Un Product Manager Trainee suele trabajar de manera supervisada o autónoma?	junior	simple_choice	{Supervisada,Autónoma}	{0}	string	string	t	2024-11-06 21:53:27.148	2024-11-06 21:53:27.148	3c40732d-6ed4-4a69-95ce-756e128a6c5c
9b3d230a-6997-4b7a-87ac-dd388c8335ba	¿Cuál es una habilidad importante para un Product Manager Trainee?	junior	simple_choice	{"Diseño gráfico.","Habilidades estratégicas y análisis de mercado. "}	{1}	string	string	t	2024-11-06 21:54:32.824	2024-11-06 21:54:32.824	3c40732d-6ed4-4a69-95ce-756e128a6c5c
1fc6a823-9f93-4629-ae7d-2f6bead787e3	¿En qué área colabora principalmente un Product Manager Trainee?	junior	simple_choice	{"Desarrollo de productos. ","Soporte técnico."}	{0}	string	string	t	2024-11-06 21:55:18.408	2024-11-06 21:55:18.408	3c40732d-6ed4-4a69-95ce-756e128a6c5c
4c420560-6873-4b95-aeb7-d23af46d6ead	pregunta 2	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
c99fe354-78fe-49be-8bcf-0935c62fb2cf	preg 1	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
5b7eb9cd-3c86-452a-babd-8da85064866b	preg 1	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
3e76a6fd-0228-4ff0-bb71-a899bfc50f16	preg 2	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
7df21e72-b87d-4ed5-885a-e6a86671a26b	¿Qué es un roadmap de producto?	junior	simple_choice	{"Un plan estratégico que define la dirección y el desarrollo de un producto. ","Una lista de tareas diarias para el equipo de ventas."}	{0}	string	string	t	2024-11-06 21:56:45.427	2024-11-06 21:56:45.427	3c40732d-6ed4-4a69-95ce-756e128a6c5c
35a14812-f206-4afe-842d-a77cfa2c2c4f	¿Quién supervisa al Product Manager Trainee?	junior	simple_choice	{"El equipo de ventas.","El Product Manager. "}	{1}	string	string	t	2024-11-06 21:57:51.479	2024-11-06 21:57:51.479	3c40732d-6ed4-4a69-95ce-756e128a6c5c
0a245005-88f9-4140-98c2-60d8ec2b7c66	¿Por qué es importante el análisis de mercado para un Product Manager Trainee?	junior	simple_choice	{"Para entender las necesidades y preferencias del público objetivo. ","Para gestionar los recursos financieros."}	{}	string	string	t	2024-11-06 21:58:38.041	2024-11-06 21:58:38.041	3c40732d-6ed4-4a69-95ce-756e128a6c5c
f06e1f4c-bdc5-43bb-ac2a-aaf1e4d57cd0	Pre 1	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
b663490a-9dfc-4c8f-aab7-baddb2ce074c	Preg 2	trainee	multiple_choice	{A,B,C}	{0,2}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
01cab430-b098-4ab9-9090-97ee2125cc17	Preg 3	trainee	simple_choice	{1,2}	{0}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
6c266545-113a-423e-9f02-867b3849db5d	Preg 4	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
56a1cf91-3790-4776-a756-62390450e978	Preg 5	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
fddbccdd-4ac2-4081-abc8-ba6bd5fc2a12	Preg 6	trainee	multiple_choice	{1,2,3}	{2,1}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
8d59b0ab-30f7-40e9-9f88-7e0ef7c06079	Preg 7	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
9fdca9de-8a1f-42bd-951b-3c51786640cc	Preg 8	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
dbf9b141-9f38-4cfc-accd-04e2677dde4b	Preg 9	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
c61a9ddf-b000-422d-9139-10cc8852fc3a	Preg 10	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-01 15:21:33.185	2025-09-01 15:21:33.185	285f4f14-80ec-438d-a2a4-39ea38098c39
05dea043-d974-43d7-9265-c94ae9db0e52	preg 3	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
7de656ad-5935-4e67-9c52-f192a1443c84	preg 4	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
9c1d53b6-5eb1-47b0-bcdd-c33095f2e00f	preg 5	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
d95838b8-212e-4983-9e47-ea2e31c8ff01	preg 6	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
cc6901e8-e9c9-4df5-a24e-ebde1f3d7efd	preg 7	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
71b51227-43b8-4130-8377-f60038b6f3e7	preg 8	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
4113fa51-5dd9-4daa-a4f8-a5035b80911b	preg 9	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
788022a6-45dd-4510-bd10-91192fa486cb	preg 10	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	91fd4ec1-071e-4b08-b471-3527330ac503
7157ff00-6584-46c2-9e34-b4d0423e6892	qwdqw	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
7998a135-4147-4910-97d8-830af7788ef0	qdwqdqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
178c5b21-6214-4b08-90c1-0d261b9b8a06	qdwqdqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
5739688d-52de-4fde-b0cb-fa53a34650be	qdqwdwqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
998d39b0-9995-4aef-8347-0b4779ffa67f	qdqwd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
25da63c3-dbee-46aa-9d15-58ae2164eaae	pregunta	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
494106a4-6918-47ad-bb06-f86e910e5693	pregunta 1	middle	true_false	{Falso,Verdadero}	{1}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
fb2dcbda-7013-477f-94ab-4639d128de15	pregunta 2	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
202c0c3b-4d80-4416-9dea-bc510a04daab	pregunta 5	middle	true_false	{Falso,Verdadero}	{1}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
c47b5a89-de22-4425-909f-5f910709fe79	pregunta 9	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
f51b4f32-0db2-436b-9a86-9f7162bd13e5	pregunta 5	middle	true_false	{Falso,Verdadero}	{1}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
c720fb13-5763-40b4-a81c-d4d23d929847	pregunta	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
63d510ae-f40e-4bbf-bb13-df84239756bc	pregunta	middle	true_false	{Falso,Verdadero}	{1}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
db7de885-296f-4f71-b29f-d0e4b8bb5cbc	pregunta 5	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-03 18:48:05.492	2024-12-03 18:48:05.492	7ff17041-ff61-4177-a16f-e1b6a651ad97
b71a4a4a-1aeb-4b1f-97a9-53803cf32f8f	pregua	junior	true_false	{Falso,Verdadero}	{1}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
91857979-e950-4fc8-9246-1d387d625ae1	pregunta 10	junior	true_false	{Falso,Verdadero}	{0}			t	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	3b848f89-a35e-4cf2-8318-c893333ff817
470906ee-4e8c-4e45-aaf2-8b7ad5b3a887	preg 1	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
ac9db6d5-7394-4c38-86a7-da4bc8159142	preg 2	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
7c00dc3e-862b-4ece-83b7-f330bd40abd5	una pregunta	trainee	multiple_choice	{qw,qw,qw}	{0,2}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
3a13945f-21e4-468e-bb69-bdc603322b8a	una pregunta	trainee	true_false	{Falso,Verdadero}	{0}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
d7f063e2-a956-477d-ab2e-fda97ec00452	una pregunta	trainee	simple_choice	{sdfe,hhg}	{0}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
c1919804-2024-4d51-9636-1cff3d7d6f9d	una pregunta	trainee	simple_choice	{rer,e,erer}	{1}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
22ac0c58-5b1b-45d3-baa7-92068f701ca1	una pregunta	trainee	multiple_choice	{ere,erer,ert,ere}	{0,3}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
cb6bd974-f3c4-48ea-aaf0-43be2ada2a79	una pregunta	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
c20c0907-7373-4ed6-ad12-9814c524dd43	una pregunta	middle	true_false	{Falso,Verdadero}	{1}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
8f222024-f989-4c9d-9213-d335077ea522	una pregunta	middle	true_false	{Falso,Verdadero}	{0}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
c0dfd130-50b6-4651-98cb-b7e88a67e1b1	una pregunta	middle	true_false	{Falso,Verdadero}	{1}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
c356fbfe-e2e3-4c2c-b047-7eacceb98054	una pregunta	middle	simple_choice	{dfd,dfd}	{0}			t	2024-12-04 02:42:29.481	2024-12-04 02:42:29.481	34920a4a-1c6b-44a3-95e4-9fff36de3de9
a99c6f88-3360-4d8e-b0c9-5acd9c2c34a9	¿El aseguramiento de calidad se enfoca exclusivamente en encontrar errores en el software?	trainee	true_false	{Falso,Verdadero}	{0}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
4803c40e-9814-4681-a06a-e75d4f1e95a6	¿Un caso de prueba siempre incluye pasos a seguir, datos de entrada y el resultado esperado?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
a2445ba5-4578-4e04-b548-1d83949f1384	¿Las pruebas de regresión aseguran que nuevas funcionalidades no afecten funcionalidades existentes?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
c2a3b5fe-70ee-4a35-84bb-451f5a88a340	¿JIRA es una herramienta que solo se utiliza para gestionar bugs?	trainee	true_false	{Falso,Verdadero}	{0}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
019924fa-665b-4399-9aee-4c4fe62a78f4	¿Las pruebas exploratorias no requieren un plan o casos de prueba previos?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
4f1f8a63-33b0-4e7b-ad62-a3084023a0eb	¿Un defecto crítico es aquel que afecta directamente la funcionalidad principal de un sistema?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
48687582-dc0a-4381-b94e-0ffc254f733d	¿El ciclo de vida del desarrollo de software (SDLC) incluye planificación, diseño, desarrollo, pruebas, implementación y mantenimiento?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
46fe8495-7700-4c21-b5b5-8cf1766bfae0	¿El objetivo de las pruebas de integración es verificar cómo interactúan los módulos del sistema entre sí?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
a44362c7-c226-4923-9b80-b73015f1e701	¿El rol de QA incluye participar en la definición de requerimientos desde etapas iniciales del proyecto?	trainee	true_false	{Falso,Verdadero}	{1}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
8fb9ffa5-f066-4ac9-95f4-249f4abc84c4	¿El testing manual es innecesario cuando existe automatización de pruebas?	trainee	true_false	{Falso,Verdadero}	{0}			t	2024-12-07 15:23:42.566	2024-12-07 15:23:42.566	3c827617-c6df-4f96-80be-3be9f32edd0b
f99392e3-ce63-47aa-94e5-39a4adaa3ffa	preg 3	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
e6e7c01e-1ba1-4233-ab8d-b1f267c618b1	preg 4	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
9c77d082-d683-4252-a874-913385854f3a	preg 5	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
1042d568-f25a-44cc-9f1f-0244681651c8	preg 6	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
afe4c690-9abe-4eb4-a940-e36346f2e893	preg 7	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
65e716ac-c827-4dd0-af2a-90dd365d5a74	preg 8	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
4b333570-58db-487d-a3f2-4ab13e20e556	preg 9	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
2d61ca5e-6d63-441c-8b52-063100c076b2	preg 10	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	dde24697-5e63-4de3-a076-15490db91912
efd30238-01e9-4118-ad41-002349629bb7	qdqwdqd	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	968e2822-3d0e-483d-bac2-9b543193719d
80d9d426-237d-4910-b2bd-c07452acc532	¿Qué comportamientos fomentan un buen trabajo en equipo?	senior	multiple_choice	{"Escuchar activamente","compartir información","Imponer desiciones ","Resolución de conflictos"}	{0,1}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
d9b7b6e7-dc94-45d3-bdc4-f04c4303281c	¿Qué habilidades blandas son especialmente valoradas en el área de IT?	senior	multiple_choice	{"Comunicación clara ","Colaboración ","Fuerza física ","Pensamiento asertivo"}	{1,0}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
163115fd-50f7-47f1-be92-fd5f015ed1b9	¿Cuáles son buenas razones para postular a una practica profesional en IT?	senior	multiple_choice	{"Obtener experiencia laboral","Evitar estudiar ","Aprender de profesionales del rubro",certificado}	{0,2}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
0f3bd0ab-2948-4328-ab8e-b3e6d9704321	Una base de datos relacional organiza los datos en lista de elementos no estructurados 	senior	true_false	{Falso,Verdadero}	{0}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
17bb177b-f8c6-4323-a4cd-fe9287acd0af	Escuchar distintas opiniones mejora el trabajo en equipo	senior	true_false	{Falso,Verdadero}	{1}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
1848bd51-d4e6-4d4f-a4f6-fff9fa32e6ac	No se necesita tener iniciativa propia en una practica, solo seguir instrucciones 	senior	true_false	{Falso,Verdadero}	{0}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
499e2746-0ab6-468a-a43d-52fc384e397f	La industria IT valora tanto las habilidades técnicas como las blandas	senior	true_false	{Falso,Verdadero}	{1}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
a56417e2-d333-4d89-babe-4713327c7d61	¿Cual de los siguientes lenguajes es comúnmente usado para desarrollo web front-tend? 	senior	simple_choice	{Python,JavaScript,SQL,C++}	{1}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
b9dcfb1c-d5ae-4a75-800d-0ce87b9f5ba3	¿Para que sirve el sistema de control de versiones Git?	senior	simple_choice	{"Editar imagenes","Diseñar base de datos","Gestionar versiones de código fuente","Crear entornos virtuales"}	{2}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
49891e00-d0dd-45bc-81dd-bd94a6c48b19	¿Cuál de los siguientes no es un sistema operativo? 	senior	simple_choice	{Windows,Ubuntu,Git,maCos}	{2}			t	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	8785d93a-3f76-40a0-b800-42e65f68bf66
b8c148a9-4507-430d-bcfe-222f08f2ef20	¿Cuáles son objetivos del QA en software?	trainee	multiple_choice	{"Prevenir defectos durante el desarrollo.","Garantizar la calidad del producto final.","Reducir el número de desarrolladores."," Eliminar por completo la necesidad de pruebas."}	{0,1}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
de4d5a06-5e7f-4cee-ba30-5c32b626a560	¿Qué tipos de pruebas verifican la funcionalidad?	trainee	multiple_choice	{"Pruebas de carga.","Pruebas de compatibilidad.","Pruebas unitarias"," Pruebas de integración."}	{3,2}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
06118515-d19d-4b4d-bdc7-b4efb02f892c	¿Cuáles son pruebas no funcionales?	trainee	multiple_choice	{"Pruebas de usabilidad.","Pruebas de rendimiento.","Pruebas de seguridad.","Pruebas de regresión."}	{1,2}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
33f623c2-1349-4e4a-ab6f-8fbfc3a8a127	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Selenium,Postman,Trello,Jira}	{0,1}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
b2a5d1c8-15c0-4931-b9a8-a0b3f1e91c11	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
6507168b-aef1-4342-b2bc-97d74ff38005	Las pruebas de regresión se ejecutan después de hacer cambios en el código.	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	fd50d798-6dd3-4e83-a2c6-c74b10c4dd09
ca19dcc8-00e4-4459-b0b6-e81d4011da46	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Trello,Postman,Selenium}	{2,1}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
52e0af0c-6ec9-4525-9083-72f52485428f	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Selenium,Trello,Postman}	{2,1}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
9f9b12bf-8eef-40b7-8838-20630c515c1e	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{P,S,T}	{1,0}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
385f404c-76b9-4817-b7c6-6284ac383196	Las pruebas de regresión se ejecutan después de hacer cambios en el código	trainee	multiple_choice	{Selenium,Postan,Jira,Trello}	{1,0}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
52ee022b-f759-4622-b2ba-92dd91d58ae5	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{A,B,C,D,E,F}	{0,2}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
7d5cb7d7-0ab4-43be-920c-573e9ced5d49	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Postman,Selenium,Jira}	{0,1}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
a21599ae-5a24-4e40-beb6-527aa83ac317	Las pruebas de regresión se ejecutan después de hacer cambios en el código	trainee	multiple_choice	{A,B,c}	{1,2}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
6e21af01-bf63-4120-936b-13ec25aff048	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Postman,Postman,Postman}	{1,0}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
846a37d0-e622-4791-97c2-1410603e1dcb	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Postman,Jira,Trello,Selenium}	{0,3}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
1eadab86-882c-42f5-9ad9-87510fa6cb97	¿Qué herramientas se usan para automatización de pruebas?	trainee	multiple_choice	{Postman,Jira,Trello,Selenium}	{0,3}			t	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	c78668c5-b4d2-4161-831d-6e9444cbbc1d
3257a8bc-2bfb-4df7-bf10-d653ab393932	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
88d73ef8-070d-4806-a18a-5ebc3cb176d4	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
e20444fa-9586-4d54-8855-74881ec31c86	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
1f5cdeae-425f-4eb7-bf6e-1115b0a43e0d	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
15cf89ee-2813-4714-b8f9-d25bf0bc1eaa	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{1}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
71fa9e43-7eda-4a83-a1fe-090e33db4bbc	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
04d21680-454e-4e01-b495-e5559a3249cb	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
45c532c9-ce89-4a3e-bce6-30565ccb8766	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
7ee8162a-fdf0-4cd2-85ad-518ff6621081	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
d7e17e91-bb48-4878-ab58-867b5abbe8d9	El objetivo principal del QA es encontrar todos los bugs antes de que el software llegue al usuario.	trainee	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	63c6d960-e192-4254-9671-e71fd4235136
3b89e2d6-d3f0-44f8-b1d1-03ff58e1d864	¿Qué tipos de prueba se realiza sin conocer la estructura interna del código? 	junior	multiple_choice	{"Prueba de caja blanca","Prueba de caja negra","prueba unitaria","prueba estática"}	{1,2}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
77e3a5c4-0c88-41e8-a0ea-3d41f6cfc3ea	Cual de las siguientes pruebas no es funcional?	junior	simple_choice	{"prueba de integracion","prueba de rendimiento"}	{1}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
49f971bc-efd4-4d4b-9f6f-13585e558120	Que significa  cuando un bug es reproducible ?	junior	simple_choice	{"Se puede repetir siguiendo los mismos pasos ","Solo ocurre una vez"}	{0}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
a7551f4d-bfce-46eb-97c7-78512f8348fc	En un caso de prueba ¿para que sirve el resultado esperado?	junior	simple_choice	{"Determinar si la prueba pasa o falla ","Mostrar los pasos a seguir "}	{0}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
973d6267-23d2-46e4-8700-34b400bca29b	El plan de pruebas se elabora después de ejecutar todas las pruebas 	junior	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
52cc1c50-93a9-40a5-a987-caac76417a62	Un bug reproducible es aquel que ocurre de manera aleatoria.	junior	true_false	{Falso,Verdadero}	{0}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
2410da21-b59a-4769-aedc-20ac131e1095	Las pruebas de humo se realizan para validar las funciones criticas del sistema tras una nueva versión.	junior	true_false	{Falso,Verdadero}	{1}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
1aba5765-1f71-4c9a-befb-55ee06638e45	Las pruebas de caja blanca requieren conocimiento de la lógica interna del código	junior	true_false	{Falso,Verdadero}	{1}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
f38d4e69-c207-4637-b46c-afeda90e6b83	Las pruebas de estrés se utilizan para evaluar el rendimiento del sistema bajo alta carga.	junior	true_false	{Falso,Verdadero}	{1}			t	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	1d71166a-e0d3-4902-8b1e-523ed40bcbc0
\.


--
-- Data for Name: Quiz; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Quiz" (id, name, description, cell_id, seniority, challenge_type, max_time, created_by_id, created_at, updated_at, is_active) FROM stdin;
12faa328-c814-493a-b405-fe2f38e780ec	Test Thamy Agosto 2025	prueba	d5881ba6-4866-403f-8b6e-a8b45298a394	junior	immediate	\N	7bac75dc-8f25-4d43-9d41-a5fd553995e0	2025-08-03 00:33:34.82	2025-08-03 00:33:34.82	t
dde24697-5e63-4de3-a076-15490db91912	Test Thamy	descripcion	989d898a-3ca8-453c-ab2e-1cc4f9510b8c	trainee	immediate	\N	7bac75dc-8f25-4d43-9d41-a5fd553995e0	2025-08-18 21:09:01.93	2025-08-18 21:09:01.93	t
968e2822-3d0e-483d-bac2-9b543193719d	qwdwqd	qdqwd	e9120e45-ff45-491d-ae46-779167530f20	junior	immediate	\N	6ed910dc-e9e1-4435-a226-fc77dea3b007	2025-11-06 02:39:24.145	2025-11-06 11:24:36.032	t
63c6d960-e192-4254-9671-e71fd4235136	TestVerdaderoFalso	Test validar preguntas de verdaro y falso	5901518b-f699-49ce-a034-5d0fe2609345	trainee	immediate	\N	32e66647-dc8b-4c7b-9014-6e9035637870	2025-10-28 16:24:16.005	2025-10-28 16:36:23.767	t
1d71166a-e0d3-4902-8b1e-523ed40bcbc0	Fundamentos y practicas de testing	Evaluar los conocimientos  fundamentales y habilidades practicas en aseguramiento de calidad de software (QA)	dc3e2339-444a-4898-8fb4-0e420536cb62	junior	immediate	\N	c2dbab2e-c397-4fe4-814d-1cc33f3bb619	2025-10-28 00:47:58.992	2025-10-28 21:41:59.332	t
285f4f14-80ec-438d-a2a4-39ea38098c39	Prueba 1		989d898a-3ca8-453c-ab2e-1cc4f9510b8c	trainee	immediate	\N	3827c34b-8836-44c6-bb7a-ce3192b62b5c	2025-09-01 15:21:33.185	2025-09-10 23:09:02.388	t
8e24ea4a-41fb-452d-a974-d8cf81910587	Nombre de Quiz	Este challenge tiene como objetivo medir los conocimientos teóricos y prácticos esenciales para un QA-Junior. Las preguntas están diseñadas para evaluar la comprensión de procesos, herramientas, y prácticas relacionadas con el aseguramiento de calidad en proyectos de desarrollo de software.	5901518b-f699-49ce-a034-5d0fe2609345	junior	immediate	\N	a51be0a1-5628-4619-8839-892b24b57eae	2024-12-09 02:09:48.012	2025-08-03 00:27:48.223	t
3b848f89-a35e-4cf2-8318-c893333ff817	TestThamy	Pruebas de Alta post Deploy 07/08	5901518b-f699-49ce-a034-5d0fe2609345	junior	immediate	\N	7bac75dc-8f25-4d43-9d41-a5fd553995e0	2025-08-08 15:38:58.519	2025-08-08 15:38:58.519	t
c5376752-6def-490d-930a-1c9b72e93259	AlissonTest	AlissonTest	5901518b-f699-49ce-a034-5d0fe2609345	trainee	immediate	\N	32e66647-dc8b-4c7b-9014-6e9035637870	2025-08-26 03:03:37.816	2025-08-26 03:03:37.816	t
03376b31-fbe7-4f1e-84c2-c0a20c828043	Prueba  2		5901518b-f699-49ce-a034-5d0fe2609345	trainee	immediate	\N	3827c34b-8836-44c6-bb7a-ce3192b62b5c	2025-09-06 22:37:05.123	2025-09-10 23:08:41.013	t
91fd4ec1-071e-4b08-b471-3527330ac503	Prueba 4		b67aa029-5337-4468-adc7-c534c19e40a1	trainee	immediate	\N	3827c34b-8836-44c6-bb7a-ce3192b62b5c	2025-09-16 00:23:05.07	2025-09-16 00:23:05.07	t
c78668c5-b4d2-4161-831d-6e9444cbbc1d	Test de respuesta múltiple	Quiz para validar las preguntas de opción múltiple holllllaaaaaaaaaa	5901518b-f699-49ce-a034-5d0fe2609345	trainee	immediate	\N	32e66647-dc8b-4c7b-9014-6e9035637870	2025-10-28 16:33:40.273	2025-11-06 01:19:47.774	t
7ff17041-ff61-4177-a16f-e1b6a651ad97	prueba 45		6c88f9e9-ee68-423f-bbf9-cb8af183924f	trainee	immediate	\N	a1f16bf0-a1bf-479a-9831-e63043fc717b	2024-12-03 18:48:05.492	2025-08-16 04:01:06.886	t
3c40732d-6ed4-4a69-95ce-756e128a6c5c	PM - Trainee	Este rol es ideal para adquirir habilidades estratégicas y prácticas en gestión de productos digitales.	989d898a-3ca8-453c-ab2e-1cc4f9510b8c	trainee	immediate	\N	224742e8-731b-40bf-b05f-a7547270746c	2024-11-06 21:27:01.312	2024-11-06 21:27:01.312	t
8be7132f-8bd5-4d64-96f6-9909a1bdeb57	Competencias en aseguramiento de calidad QA	Habilidades QA	6743c93e-f5a6-4819-a178-81ce70c52618	junior	immediate	\N	c2dbab2e-c397-4fe4-814d-1cc33f3bb619	2025-08-28 21:23:20.113	2025-08-28 21:33:17.223	t
34920a4a-1c6b-44a3-95e4-9fff36de3de9	hola	desc del quiz	97928084-2555-405c-b6fa-c8fcbd47c3d5	middle	immediate	\N	a1f16bf0-a1bf-479a-9831-e63043fc717b	2024-12-04 02:42:29.481	2025-01-09 01:35:54.328	t
fd50d798-6dd3-4e83-a2c6-c74b10c4dd09	QuizzTestAlisson	Quizz para probar flujo completo. 	5901518b-f699-49ce-a034-5d0fe2609345	trainee	immediate	\N	32e66647-dc8b-4c7b-9014-6e9035637870	2025-10-28 16:15:07.893	2025-10-28 16:15:07.893	t
3c827617-c6df-4f96-80be-3be9f32edd0b	Verdadero/Falso	Está diseñado para evaluar los conocimientos fundamentales de QA en un nivel inicial. Se centra en temas como conceptos básicos de aseguramiento de la calidad, tipos de pruebas, herramientas comunes y procesos de desarrollo de software. Ideal para candidatos que recién inician su carrera en QA.	5901518b-f699-49ce-a034-5d0fe2609345	trainee	immediate	\N	a51be0a1-5628-4619-8839-892b24b57eae	2024-12-07 15:23:42.566	2025-01-14 02:25:28.197	t
8785d93a-3f76-40a0-b800-42e65f68bf66	Postulaciones	Conocimientos técnicos y habilidades	6743c93e-f5a6-4819-a178-81ce70c52618	senior	immediate	\N	c2dbab2e-c397-4fe4-814d-1cc33f3bb619	2025-10-01 19:59:04.29	2025-10-28 21:31:09.146	t
36f15120-994f-4f86-9367-ca270f95e8d9	PM	hhhh	989d898a-3ca8-453c-ab2e-1cc4f9510b8c	trainee	immediate	\N	224742e8-731b-40bf-b05f-a7547270746c	2024-11-06 23:05:41.051	2024-11-20 02:00:26.979	t
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."Role" (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: RoleUser; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."RoleUser" (id, role_id, user_id, seniority) FROM stdin;
\.


--
-- Data for Name: SocialNetwork; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."SocialNetwork" (id, platform, url, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: SoftSkill; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."SoftSkill" (id, name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."User" (id, email, password, first_name, last_name, gender, photo, phone_number, timezone, is_active, is_staff, is_superuser, created_at, updated_at, last_login, birthdate, "resetPasswordExpires", "resetPasswordToken", "emailConfirmationToken", "emailConfirmed", "emailConfirmationExpires") FROM stdin;
224742e8-731b-40bf-b05f-a7547270746c	daniela@mail.com	contraseña	daniela	soto	female	\N	2615986267	\N	t	f	t	2024-10-14 22:07:40.532	2024-10-14 22:07:40.532	\N	1986-06-05 14:30:00	\N	\N	\N	f	\N
f4ca6ad5-4cbc-4574-86e0-831772e12e22	javier@mail.com	contraseña	javier	brizuela	male	\N	2615859635	\N	t	f	t	2024-10-14 22:07:42.048	2024-10-14 22:07:42.048	\N	1976-06-05 14:30:00	\N	\N	\N	f	\N
56c17dcc-ec04-41da-97bb-89019a1d32c6	kosku5000@gmail.com	defaultPassword	jesus daniel	solano Montaña		https://lh3.googleusercontent.com/a/ACg8ocIKFEhVVnw4a4XG_4MFbQ2DOmZ-y6il2OncNuCOiWbI1awFrXQM=s96-c			t	f	f	2024-10-15 00:51:52.772	2024-10-15 00:51:52.772	\N	\N	\N	\N	\N	f	\N
a1f16bf0-a1bf-479a-9831-e63043fc717b	jbrizuela1976@gmail.com	defaultPassword	javier	brizuela		https://lh3.googleusercontent.com/a/ACg8ocL_wlUNIsSeJi5oqqC6ooFLib2lZZmKFA8Xdv9qd1PI0oUspTUplg=s96-c			t	f	f	2024-10-23 23:57:02.492	2024-10-23 23:57:02.492	\N	\N	\N	\N	\N	f	\N
209d1e2a-f6b2-4cdf-8cf3-234837bb62a7	aloshdz81@gmail.com	defaultPassword	Alosmary	Hernández		https://lh3.googleusercontent.com/a/ACg8ocJTpBtqy76h8W3uu2cAGyZGaRIu79__WbUUocZr9QXwQST2COASXQ=s96-c			t	f	f	2024-10-24 00:25:45.694	2024-10-24 00:25:45.694	\N	\N	\N	\N	\N	f	\N
a01ce3ae-9834-475c-a83a-8876dfef7179	danysoto41@gmail.com	defaultPassword	daniela	soto		https://lh3.googleusercontent.com/a/ACg8ocIfPGPAMy4MLK4WbFDw88csZ_LTHtuMCUioJLbYV6ENErN_4-Gr=s96-c			t	f	f	2024-10-24 00:33:24.603	2024-10-24 00:33:24.603	\N	\N	\N	\N	\N	f	\N
c4bb458b-e85d-43cd-acb7-1a70264364e5	tomas.vs.2003@gmail.com	defaultPassword	Tomás	Soto		https://lh3.googleusercontent.com/a/ACg8ocJRfU3XqZeFswQOQgXIwvo1exk6SpJmlhOsiJDp2hmpWRraOzg=s96-c			t	f	f	2024-10-24 00:38:32.723	2024-10-24 00:38:32.723	\N	\N	\N	\N	\N	f	\N
7bac75dc-8f25-4d43-9d41-a5fd553995e0	ingthamairyg@gmail.com	defaultPassword	Thamy	Gonzalez		https://lh3.googleusercontent.com/a/ACg8ocKolhyuqJ_A19zLeBtLv9A-VWdVRZFFjGNn4iY-Kafa6GgvDUhGjw=s96-c			t	f	f	2024-10-25 01:21:52.334	2024-10-25 01:21:52.334	\N	\N	\N	\N	\N	f	\N
8c93e1d6-c137-4648-a1aa-114c3891a39c	ignaciosalazar986@gmail.com	defaultPassword	ignacio	salazar		https://lh3.googleusercontent.com/a/ACg8ocKaMXuN3yWxrDaTmg26x7H5UbTpGUYoxTiOzRuFQxNP_zsBzEzl=s96-c			t	f	f	2024-10-26 00:04:13.867	2024-10-26 00:04:13.867	\N	\N	\N	\N	\N	f	\N
42dfec05-ffc0-4f53-bdd7-5a9c87036829	agusdardanelli16@gmail.com	defaultPassword	Agustin Nicolas	Dardanelli		https://lh3.googleusercontent.com/a-/ALV-UjWev3melWnO57W-zuBlvXJv5m6oaO4A-ahwr5oKROuWBG823INkCScD8iZcnT3pOoqZMBSe4aj4Ioqm65oZakkAfWyIGW9QVQmsNuFncjZIr_NU6c9z00bXRSy3jaeDbbwh4v6hFLvMf0bjKTOEqX7Dm8ns0e5LQQPiDyaRGUWsRpkM03QZa4iIdCON8EHlWParhVIQ1yc9jsaYCF1Mc2VMoUwuGbaQyNFNO4jwemb14cdoiy9EUE-gR1G-S_eb1RZreQJMdRYQOcmvc0xuE4LLOb-FxI3pgsRSMrnUkfiUvvraAHOFNJpr5-Ny43wZG3KOZsSycCQtRVlcssf41pFIUC5fQKY2_IJ8qFQaGAnjOWsDpmNQpv-VXDnDVt-qrXbKUP9tjfaA1fFSJ2y3Z4cDcDaSVyvqEjHcEyxV3_1GR6rzK1pSoIJ6Y0TIfu-x5fDAZxfzorhOkp0HL82P9YKHPpwyRd4SOGZmhlhnG20UGKVpCSIhrMsFxkItpoSSYDUvWHJVriQdE5CYTnQ9E-XAOqMDXlhqCzzo55nM6LSvgy5cyNCKT0iug5_nAhUIEUB3pOYwMOtRTc_KzKbzx9VPVSBxCagvRJ0gTQzDRcwTYC2BwfNpQ2SMgbYNnuaVF2oWVZY2W6yAWFOGtQmFroSLyP-p17JFTYV8C6sfwPxlzuTud8RkH2aEmH2JZPNyhA1v9-3vnUuE8ChZwvgiiyLJbRIG10eQ1EGldnwHCFlcufj09yrbzJzs78Mj5aqb_uMYzcF_MNEFsOBqj_LO3Ow859aA7Z9lOHgqug0NGvT1n445gjSX6dGjqc_C5qmG6bo3LNrpG2_YhNZTzv8Tdxzm9WX40G64S4uF-6WhswA22CeJSzZ4Zlep_BEIPUxlwzxmn6yIuONFwzmBpG5dIq_Zc05CqOrxPbzD36isQdjdgMhPCVcKiSR9vqiXwVhcBQNDxu9hVebQozLWx7xVFFnyN59vJQ=s96-c			t	f	f	2024-10-26 21:14:55.157	2024-10-26 21:14:55.157	\N	\N	\N	\N	\N	f	\N
a51be0a1-5628-4619-8839-892b24b57eae	kreinstinortega@gmail.com	defaultPassword	Kreinstin	Ortega		https://lh3.googleusercontent.com/a/ACg8ocJ1HjlY3fjHnok78a6kGraahV-nD9rOkGJpn3_68tIX3Lvp8g=s96-c			t	f	f	2024-10-29 17:47:29.617	2024-10-29 17:47:29.617	\N	\N	\N	\N	\N	f	\N
b76a652b-8a69-44a2-8ff3-a716f56d3506	nassahel.elias@gmail.com	auth0_8wf2zc3p	Nassa			https://lh3.googleusercontent.com/a/ACg8ocIOnBesW73VkoN652RmucU34WuXBKCoq_-2u9A_0vVRRNan4czQ=s96-c		America/Buenos_Aires	t	f	f	2024-12-04 18:57:21.915	2024-12-04 18:57:21.915	\N	\N	\N	\N	\N	f	\N
11b05fd0-9fa2-4c73-9c95-14566208287e	gubedial@gmail.com	auth0_liuiaf19	Gustavo Alejandro	Vizgarra		https://lh3.googleusercontent.com/a/ACg8ocKNoCvIYYGAzF0MpRrYnaJzDvKqxvLNqOSU0PmsDJ-tXz-LJ_C-=s96-c		America/Buenos_Aires	t	f	f	2024-12-13 20:27:06.753	2024-12-13 20:27:06.753	\N	\N	\N	\N	\N	f	\N
e0cc4def-0bc1-44e0-8480-161d7c4d2a7a	veisturiz@gmail.com	auth0_q0p4iai5	Victoria	Barreto		https://lh3.googleusercontent.com/a/ACg8ocIA5P9oT-8Qzqds3mW0YfswjQAN4931zRXjL213FyJJuxDRiA=s96-c		America/Buenos_Aires	t	f	f	2024-12-13 21:46:05.07	2024-12-13 21:46:05.07	\N	\N	\N	\N	\N	f	\N
32e66647-dc8b-4c7b-9014-6e9035637870	alissonpineda53@gmail.com	\N	Alisson	Pineda		https://lh3.googleusercontent.com/a/ACg8ocL9dIpuHE2DvxfYBEBcVFU67L1IFdt_6GrBy9IVg2E8NOMqjCry=s96-c		America/Bogota	t	f	f	2025-08-26 03:01:10.733	2025-08-26 03:01:10.733	\N	2025-08-26 00:00:00	\N	\N	\N	t	\N
3827c34b-8836-44c6-bb7a-ce3192b62b5c	bricenodeura@gmail.com	\N	Deura	Briceño		https://lh3.googleusercontent.com/a/ACg8ocK-RwawFX0iRR-1wzpll-zv6zfow6wOLyU1jo8_1Zbrvc3PQw=s96-c		America/Buenos_Aires	t	f	f	2025-09-01 15:14:11.603	2025-09-01 15:14:11.603	\N	2025-09-01 00:00:00	\N	\N	\N	t	\N
40307f0b-6996-4609-9e8b-7b3b108591a7	denir.testing@gmail.com	\N	Denir	Ruiz		https://lh3.googleusercontent.com/a/ACg8ocJeWMbeElUnjFeC7Ri3TR5rJ_SMn-SxmlovwfwJjv3hVV9tuA=s96-c		America/Bogota	t	f	f	2025-10-16 16:57:56.102	2025-10-16 16:57:56.102	\N	2025-10-16 00:00:00	\N	\N	\N	t	\N
b25fdb3d-eb67-40b0-a4be-bd3e79baa31b	araujo.oskr@gmail.com	\N	Araujo	Oskr		https://lh3.googleusercontent.com/a/ACg8ocK1IYXQO697ZF0--FY-MyulFPKKbSRuFsLOw37mokS0r02SsoH7=s96-c		America/Santiago	t	f	f	2025-10-16 22:36:06.384	2025-10-16 22:36:06.384	\N	2025-10-16 00:00:00	\N	\N	\N	t	\N
dc6ec538-e11f-4466-a3fb-deccf3aa3074	maxilazo888@gmail.com	\N	maxi	aramayo		https://lh3.googleusercontent.com/a/ACg8ocIK94OxwlpghAETwXwt4doZFBNN2pJVW2pUTGk1VE9PwVuSg8sseg=s96-c		America/Buenos_Aires	t	f	f	2025-10-16 23:23:57.035	2025-10-16 23:23:57.035	\N	2025-10-16 00:00:00	\N	\N	\N	t	\N
88a91ab6-30dd-44bc-9322-c2494bb78d9e	alissonpiga53@gmail.com	\N	Alisson	\N	\N	\N	\N	\N	t	f	f	2025-10-17 00:54:19.674	2025-10-21 00:32:31.988	\N	\N	\N	\N	a96bed3acaed2cf99a103db3b534fb90f84061375de97e70e6b92bc5f7c4702f	f	2025-10-21 01:32:31.986
96a49e89-4e29-486b-b7aa-20ca6211abda	apior0753@gmail.com	\N	Alisson	\N	\N	\N	\N	\N	t	f	f	2025-10-21 00:33:55.42	2025-10-21 00:33:55.42	\N	\N	\N	\N	7334233bba367c9014bf8a7eaf158c230d9bacb39b28b633dbfa7d81587fa2f3	f	2025-10-21 01:33:55.419
981ca39f-7c16-4c9a-9b87-86f271dbec7f	alissonpiga553@gmail.com	\N	Alisson Pineda	\N	\N	\N	\N	\N	t	f	f	2025-10-21 00:57:30.388	2025-10-21 00:57:30.388	\N	\N	\N	\N	785d39ac36e662efc06d03ddc78c76fbdd834f68830acdcf4aa3a122fc00c1ab	f	2025-10-21 01:57:30.387
a150e7ba-a05a-4b57-ae46-300281df289f	bravojuan43@gmail.com	\N	Juan	Bravo		https://lh3.googleusercontent.com/a/ACg8ocK_kpt7feagKJUIjqo181GGAUjvfc-w-ISMvdleEahs5AIxwu6AmA=s96-c		America/Buenos_Aires	t	f	f	2025-11-06 00:39:44.882	2025-11-06 00:39:44.882	\N	2025-11-06 00:00:00	\N	\N	\N	t	\N
7c818478-e026-4763-a4b5-d04911a63622	vapohet348@datoinf.com	\N	2	\N	\N	\N	\N	\N	t	f	f	2025-10-21 21:22:08.959	2025-10-28 17:29:14.932	\N	\N	\N	\N	12e9028d5da0db7b30bea5f77039914dba118b7d919d0e5c7df83bf1e6dc8437	f	2025-10-28 18:29:14.931
c2dbab2e-c397-4fe4-814d-1cc33f3bb619	denirje@gmail.com	$2b$10$lPdn03fRcmi2HMjVeALA4O5Bq5Cmv6pB/lzX6vTF0IQ3bUw5jsVCS	Denir Ruiz	Ruiz	\N	\N	+5731088556	\N	t	f	f	2025-08-19 00:24:23.066	2025-11-04 00:29:06.532	\N	\N	\N	\N	\N	t	\N
a867e638-d4ab-404f-8c61-e5f16ac78c02	japedrazaruiz11@gmail.com	\N	Jhorman pedraza	\N	\N	\N	\N	\N	t	f	f	2025-11-04 00:10:06.72	2025-11-04 00:10:40.799	\N	\N	\N	\N	\N	t	\N
a363ab34-7b05-4ef6-9eac-fc79aad70b54	yemeh23496@burangir.com	$2b$10$bKm/r0mI.O6UpBYxSEY/fu0mb1KUvcdCfoUF0WKTA5NIG0Nol3Sw6	Juan	Bravo	\N	\N	+54922915	\N	t	f	f	2025-11-04 00:09:23.372	2025-11-04 00:56:33.533	\N	\N	\N	\N	\N	t	\N
467e25c5-b841-4f2d-8213-8d945d484f9b	santicastillo52@gmail.com	\N	Santi	Castillo		https://lh3.googleusercontent.com/a/ACg8ocKr9h3moPkh1hI5zRtk87hds4ANpB2XfXIqOKQDba9tbofeSQ=s96-c		America/Buenos_Aires	t	f	f	2025-11-06 00:39:45.013	2025-11-06 00:39:45.013	\N	2025-11-06 00:00:00	\N	\N	\N	t	\N
6ed910dc-e9e1-4435-a226-fc77dea3b007	jsolorzanosc@gmail.com	\N	Jesús	Solórzano		https://lh3.googleusercontent.com/a/ACg8ocKMCI8AecYeBOdNxD_lYG-mE5j0dCpG4qx7Vtadt-126wtt7A=s96-c		America/Caracas	t	f	f	2025-11-06 01:03:14.244	2025-11-06 01:03:14.244	\N	2025-11-06 00:00:00	\N	\N	\N	t	\N
b7b45ed4-ea66-49e2-a996-dad0dbbb3d24	jesussecond106@gmail.com	\N	Jesús	Solórzano		https://lh3.googleusercontent.com/a/ACg8ocKZQ2_alexKh1tTxQpGn8JchVFZtRYF3Lkt_gwj_4s78STO4Q=s96-c		America/Caracas	t	f	f	2025-11-06 01:03:48.025	2025-11-06 01:03:48.025	\N	2025-11-06 00:00:00	\N	\N	\N	t	\N
b023e0d1-f077-470c-bc14-00148c0c5a1a	quddgct@hi2.in	$2b$10$5TGFcT0bkS8ITbEpBgv2aOXn.kybMEovey6TOsbvZBl7D.HuAY2gm	Probando1	Probador	\N	\N	+584789587	\N	t	f	f	2025-11-06 01:35:43.371	2025-11-06 01:36:17.74	\N	\N	\N	\N	\N	t	\N
c01479cb-536f-45ac-9c43-961739676357	alissonpiga533@gmail.com	\N	Alisson	\N	\N	\N	\N	\N	t	f	f	2025-11-06 01:37:29.821	2025-11-06 01:37:29.821	\N	\N	\N	\N	0368abfa9b22e3a2ed1ede4a83ec103f9042ee7f2202770ca14c85407801cef9	f	2025-11-06 02:37:29.82
dad1bd00-1d58-4806-a360-5e717d8be0c4	xayihad830@wivstore.com	$2b$10$TvENMPZruviNOQ8X6/pPNutVZ5AZcqJ3bBizVb8KVTJ3DsRb6KtU.	AAAAAA	Ppppp	\N	\N	+88999989889	\N	t	f	f	2025-11-06 01:46:49.672	2025-11-06 01:54:42.241	\N	\N	\N	\N	\N	t	\N
\.


--
-- Data for Name: _HardSkillUser; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."_HardSkillUser" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _SocialNetworkUser; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."_SocialNetworkUser" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _SoftSkillUser; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public."_SoftSkillUser" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: avnadmin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2c9b59ad-edb0-4cf8-81d2-278837ea0ef6	4905ffbf41f4e6acd7370ca383e7855607d8423b5d2a15a8643612f2736eaf60	2024-10-19 19:06:46.867944+00	20241010004907_init	\N	\N	2024-10-19 19:06:45.934051+00	1
816433fd-d5e3-4d21-a066-6e62af770796	ca96ecec712eb7185f92468cdf99492c8dcce73a3d4be0204c0fdbb4e779a0c9	2024-10-19 19:06:47.929878+00	20241010011036_init	\N	\N	2024-10-19 19:06:47.170308+00	1
a54ecfef-7f43-4368-8d9d-82bd29343151	605d14ef36284526a3cf5b9c24e7aa8a51f64df9340bf0160d5c8da3a1f112b7	2024-10-19 19:06:48.99118+00	20241014220721_init	\N	\N	2024-10-19 19:06:48.232398+00	1
fcb28862-9862-4550-ba6a-74b888c922cf	4905ffbf41f4e6acd7370ca383e7855607d8423b5d2a15a8643612f2736eaf60	2024-10-14 22:07:08.021278+00	20241010004907_init	\N	\N	2024-10-14 22:07:07.101518+00	1
598052be-dd60-4ef1-ae3f-c400e8b5ad38	ca96ecec712eb7185f92468cdf99492c8dcce73a3d4be0204c0fdbb4e779a0c9	2024-10-14 22:07:09.121147+00	20241010011036_init	\N	\N	2024-10-14 22:07:08.33587+00	1
c3a4a121-da86-4121-8967-4cc9d78adb90	605d14ef36284526a3cf5b9c24e7aa8a51f64df9340bf0160d5c8da3a1f112b7	2024-10-14 22:07:23.41634+00	20241014220721_init	\N	\N	2024-10-14 22:07:22.625536+00	1
d66682a2-3302-4e4f-a96f-beb1af9eddb5	5c9618a2b6bc1c85c0f17a3c67bef99767b153bb310cb7b0d4d4009a911a10f9	2024-11-29 01:08:43.58617+00	20241129010733_update_unique_field	\N	\N	2024-11-29 01:08:42.814925+00	1
ffdc4768-a51b-49dc-8404-d1f79d3bb03f	d758d07dc79d1ebf5950a20fe2423cc8cf637e654d04747bbe0c61867727304b	2025-08-02 14:21:45.977596+00	20250710235856_reset_password_fields	\N	\N	2025-08-02 14:21:45.139054+00	1
f794b529-8729-43d8-abf7-9616524f515b	c5c9dcf73aeb8b92a5b2ce794e94abc34c51a57b2da5304a92f55de3b4c7299e	2025-08-02 14:21:47.116119+00	20250712211357_add_email_confirmation	\N	\N	2025-08-02 14:21:46.301599+00	1
50f75f5f-45c8-46d8-822b-259aa4cdb80e	9180e1c8d2f780d6d15945e3153248c0f27b096c28aaa617d97b989a76c8bbb1	2025-08-02 15:24:05.736673+00	20250802152404_add_email_confirmation_expires	\N	\N	2025-08-02 15:24:04.894308+00	1
87bac105-3702-4133-93fb-9fca2fe055ec	7a5689fdfee87f590220a59dbbf9b67fb74c57f0ac20b181e6df206aba1eabff	2025-11-06 21:40:09.762712+00	20251018150701_new		\N	2025-11-06 21:40:09.762712+00	0
9338e176-4ca4-4c25-a217-4e60ac7b6436	6439a6f219d17f791bffd1feef34bd8d8e9b6aa88f37f127063c27c5a52ca671	2025-11-06 21:40:23.183007+00	20251027234308_dev2		\N	2025-11-06 21:40:23.183007+00	0
00dfd3db-5b3a-42db-b874-993e825c2653	e25af45af59bc57ab05ab025c3618cea031aab94e4afbcc07e17f9089eaa5093	\N	20250911144707_init	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20250911144707_init\n\nDatabase error code: 42710\n\nDatabase error:\nERROR: type "ChallengeType" already exists\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42710), message: "type \\"ChallengeType\\" already exists", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("typecmds.c"), line: Some(1167), routine: Some("DefineEnum") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20250911144707_init"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20250911144707_init"\n             at schema-engine/commands/src/commands/apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:236	2025-11-06 21:45:01.634505+00	2025-11-06 21:33:44.453095+00	0
1f17b2c3-42a9-4cf6-befa-a9d052b98e3d	e25af45af59bc57ab05ab025c3618cea031aab94e4afbcc07e17f9089eaa5093	2025-11-06 21:45:02.235989+00	20250911144707_init		\N	2025-11-06 21:45:02.235989+00	0
\.


--
-- Name: Cell Cell_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Cell"
    ADD CONSTRAINT "Cell_pkey" PRIMARY KEY (id);


--
-- Name: Challenge Challenge_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Challenge"
    ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY (id);


--
-- Name: HardSkill HardSkill_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."HardSkill"
    ADD CONSTRAINT "HardSkill_pkey" PRIMARY KEY (id);


--
-- Name: LanguageUser LanguageUser_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."LanguageUser"
    ADD CONSTRAINT "LanguageUser_pkey" PRIMARY KEY (id);


--
-- Name: Language Language_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Language"
    ADD CONSTRAINT "Language_pkey" PRIMARY KEY (id);


--
-- Name: Module Module_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Module"
    ADD CONSTRAINT "Module_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: Quiz Quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Quiz"
    ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY (id);


--
-- Name: RoleUser RoleUser_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."RoleUser"
    ADD CONSTRAINT "RoleUser_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: SocialNetwork SocialNetwork_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."SocialNetwork"
    ADD CONSTRAINT "SocialNetwork_pkey" PRIMARY KEY (id);


--
-- Name: SoftSkill SoftSkill_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."SoftSkill"
    ADD CONSTRAINT "SoftSkill_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: HardSkill_name_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "HardSkill_name_key" ON public."HardSkill" USING btree (name);


--
-- Name: Language_language_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "Language_language_key" ON public."Language" USING btree (language);


--
-- Name: Module_name_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "Module_name_key" ON public."Module" USING btree (name);


--
-- Name: Quiz_name_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "Quiz_name_key" ON public."Quiz" USING btree (name);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: SoftSkill_name_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "SoftSkill_name_key" ON public."SoftSkill" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _HardSkillUser_AB_unique; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "_HardSkillUser_AB_unique" ON public."_HardSkillUser" USING btree ("A", "B");


--
-- Name: _HardSkillUser_B_index; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE INDEX "_HardSkillUser_B_index" ON public."_HardSkillUser" USING btree ("B");


--
-- Name: _SocialNetworkUser_AB_unique; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "_SocialNetworkUser_AB_unique" ON public."_SocialNetworkUser" USING btree ("A", "B");


--
-- Name: _SocialNetworkUser_B_index; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE INDEX "_SocialNetworkUser_B_index" ON public."_SocialNetworkUser" USING btree ("B");


--
-- Name: _SoftSkillUser_AB_unique; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE UNIQUE INDEX "_SoftSkillUser_AB_unique" ON public."_SoftSkillUser" USING btree ("A", "B");


--
-- Name: _SoftSkillUser_B_index; Type: INDEX; Schema: public; Owner: avnadmin
--

CREATE INDEX "_SoftSkillUser_B_index" ON public."_SoftSkillUser" USING btree ("B");


--
-- Name: Cell Cell_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Cell"
    ADD CONSTRAINT "Cell_module_id_fkey" FOREIGN KEY (module_id) REFERENCES public."Module"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Challenge Challenge_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Challenge"
    ADD CONSTRAINT "Challenge_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES public."Quiz"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Challenge Challenge_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Challenge"
    ADD CONSTRAINT "Challenge_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageUser LanguageUser_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."LanguageUser"
    ADD CONSTRAINT "LanguageUser_language_id_fkey" FOREIGN KEY (language_id) REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: LanguageUser LanguageUser_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."LanguageUser"
    ADD CONSTRAINT "LanguageUser_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Question Question_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES public."Quiz"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Quiz Quiz_cell_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Quiz"
    ADD CONSTRAINT "Quiz_cell_id_fkey" FOREIGN KEY (cell_id) REFERENCES public."Cell"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Quiz Quiz_created_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."Quiz"
    ADD CONSTRAINT "Quiz_created_by_id_fkey" FOREIGN KEY (created_by_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RoleUser RoleUser_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."RoleUser"
    ADD CONSTRAINT "RoleUser_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RoleUser RoleUser_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."RoleUser"
    ADD CONSTRAINT "RoleUser_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _HardSkillUser _HardSkillUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."_HardSkillUser"
    ADD CONSTRAINT "_HardSkillUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."HardSkill"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _HardSkillUser _HardSkillUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."_HardSkillUser"
    ADD CONSTRAINT "_HardSkillUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _SocialNetworkUser _SocialNetworkUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."_SocialNetworkUser"
    ADD CONSTRAINT "_SocialNetworkUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."SocialNetwork"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _SocialNetworkUser _SocialNetworkUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."_SocialNetworkUser"
    ADD CONSTRAINT "_SocialNetworkUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _SoftSkillUser _SoftSkillUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."_SoftSkillUser"
    ADD CONSTRAINT "_SoftSkillUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."SoftSkill"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _SoftSkillUser _SoftSkillUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: avnadmin
--

ALTER TABLE ONLY public."_SoftSkillUser"
    ADD CONSTRAINT "_SoftSkillUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict LeZJSB5Qg9xVEMlwqX87B6uPcBmXzUyma79bBIchUm5V6kgMgBaooVMGsELmFzi

