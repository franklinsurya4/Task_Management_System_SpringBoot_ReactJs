--
-- PostgreSQL database dump
--

\restrict vpY3KN6xMy8O2w6RKGqeeoeJKSBjx9hxeC1BbAB1FxVxowMuqfWfvqvhixIBzp8

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_history (
    id bigint NOT NULL,
    ai_response text,
    "timestamp" timestamp(6) without time zone,
    user_prompt text
);


ALTER TABLE public.chat_history OWNER TO postgres;

--
-- Name: chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chat_history_id_seq OWNER TO postgres;

--
-- Name: chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_history_id_seq OWNED BY public.chat_history.id;


--
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_messages (
    id character varying(255) NOT NULL,
    content text NOT NULL,
    role character varying(255) NOT NULL,
    "timestamp" timestamp(6) without time zone,
    tokens_used integer,
    session_id character varying(255) NOT NULL,
    CONSTRAINT chat_messages_role_check CHECK (((role)::text = ANY ((ARRAY['USER'::character varying, 'ASSISTANT'::character varying, 'SYSTEM'::character varying])::text[])))
);


ALTER TABLE public.chat_messages OWNER TO postgres;

--
-- Name: chat_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_sessions (
    id character varying(255) NOT NULL,
    created_at timestamp(6) without time zone,
    title character varying(255) NOT NULL,
    updated_at timestamp(6) without time zone
);


ALTER TABLE public.chat_sessions OWNER TO postgres;

--
-- Name: favourite_task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favourite_task (
    id bigint NOT NULL,
    task_id bigint,
    user_id bigint
);


ALTER TABLE public.favourite_task OWNER TO postgres;

--
-- Name: favourite_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favourite_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favourite_task_id_seq OWNER TO postgres;

--
-- Name: favourite_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favourite_task_id_seq OWNED BY public.favourite_task.id;


--
-- Name: google_form_task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.google_form_task (
    id bigint NOT NULL,
    form_url character varying(255),
    image_url character varying(255),
    score integer,
    sheet_id character varying(255),
    status character varying(255),
    title character varying(255)
);


ALTER TABLE public.google_form_task OWNER TO postgres;

--
-- Name: google_form_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.google_form_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.google_form_task_id_seq OWNER TO postgres;

--
-- Name: google_form_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.google_form_task_id_seq OWNED BY public.google_form_task.id;


--
-- Name: integration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.integration (
    id bigint NOT NULL,
    access_token character varying(2000),
    connected boolean NOT NULL,
    provider character varying(255),
    refresh_token character varying(2000),
    updated_at timestamp(6) without time zone,
    user_id bigint
);


ALTER TABLE public.integration OWNER TO postgres;

--
-- Name: integration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.integration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.integration_id_seq OWNER TO postgres;

--
-- Name: integration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.integration_id_seq OWNED BY public.integration.id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notes (
    id integer NOT NULL,
    content character varying(255),
    title character varying(255)
);


ALTER TABLE public.notes OWNER TO postgres;

--
-- Name: notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notes_id_seq OWNER TO postgres;

--
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;


--
-- Name: notification_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification_settings (
    id bigint NOT NULL,
    email_enabled boolean NOT NULL,
    in_app_enabled boolean NOT NULL,
    notification_type character varying(255),
    user_id bigint
);


ALTER TABLE public.notification_settings OWNER TO postgres;

--
-- Name: notification_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notification_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notification_settings_id_seq OWNER TO postgres;

--
-- Name: notification_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notification_settings_id_seq OWNED BY public.notification_settings.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    is_read boolean,
    message character varying(255),
    user_id bigint
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: privacy_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.privacy_settings (
    id bigint NOT NULL,
    activity_hidden boolean NOT NULL,
    allow_admins boolean NOT NULL,
    allow_guests boolean NOT NULL,
    allow_members boolean NOT NULL,
    notify_comments boolean NOT NULL,
    notify_task_changes boolean NOT NULL,
    task_visibility character varying(255),
    user_id bigint
);


ALTER TABLE public.privacy_settings OWNER TO postgres;

--
-- Name: privacy_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.privacy_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.privacy_settings_id_seq OWNER TO postgres;

--
-- Name: privacy_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.privacy_settings_id_seq OWNED BY public.privacy_settings.id;


--
-- Name: system_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_settings (
    id bigint NOT NULL,
    allow_user_registration boolean NOT NULL,
    app_name character varying(255),
    auto_archive_days integer NOT NULL,
    default_task_priority character varying(255),
    enable_email_notifications boolean NOT NULL,
    maintenance_mode boolean NOT NULL,
    max_file_upload_size integer NOT NULL,
    uploaded_file_name character varying(255)
);


ALTER TABLE public.system_settings OWNER TO postgres;

--
-- Name: system_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.system_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.system_settings_id_seq OWNER TO postgres;

--
-- Name: system_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.system_settings_id_seq OWNED BY public.system_settings.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id bigint NOT NULL,
    description character varying(255),
    due_date date,
    google_form_url character varying(255),
    image_url character varying(255),
    score integer,
    status character varying(255),
    title character varying(255),
    assigned_user_id bigint,
    completed_date date,
    priority character varying(255),
    CONSTRAINT task_priority_check CHECK (((priority)::text = ANY ((ARRAY['LOW'::character varying, 'MEDIUM'::character varying, 'HIGH'::character varying])::text[])))
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_id_seq OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: todos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todos (
    id bigint NOT NULL,
    completed boolean NOT NULL,
    text character varying(255)
);


ALTER TABLE public.todos OWNER TO postgres;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.todos_id_seq OWNER TO postgres;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- Name: user_notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_notifications (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    email_enabled boolean,
    in_app_enabled boolean,
    notification_type character varying(255),
    push_enabled boolean,
    updated_at timestamp(6) without time zone,
    user_id bigint
);


ALTER TABLE public.user_notifications OWNER TO postgres;

--
-- Name: user_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_notifications_id_seq OWNER TO postgres;

--
-- Name: user_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_notifications_id_seq OWNED BY public.user_notifications.id;


--
-- Name: user_preference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_preference (
    id bigint NOT NULL,
    default_task_filter character varying(255),
    email_notifications boolean,
    language character varying(255),
    theme character varying(255),
    user_id bigint
);


ALTER TABLE public.user_preference OWNER TO postgres;

--
-- Name: user_preference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_preference_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_preference_id_seq OWNER TO postgres;

--
-- Name: user_preference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_preference_id_seq OWNED BY public.user_preference.id;


--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_settings (
    id bigint NOT NULL,
    auto_archive_completed boolean,
    dark_mode boolean,
    data_export_allowed boolean,
    default_task_status character varying(255),
    default_task_view character varying(255),
    email_integration boolean,
    email_notifications boolean,
    google_calendar_sync boolean,
    in_app_notifications boolean,
    language character varying(255),
    notification_frequency character varying(255),
    sms_enabled boolean,
    time_zone character varying(255),
    two_factor_enabled boolean,
    user_id bigint NOT NULL
);


ALTER TABLE public.user_settings OWNER TO postgres;

--
-- Name: user_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_settings_id_seq OWNER TO postgres;

--
-- Name: user_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_settings_id_seq OWNED BY public.user_settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL,
    sms_enabled boolean NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history ALTER COLUMN id SET DEFAULT nextval('public.chat_history_id_seq'::regclass);


--
-- Name: favourite_task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourite_task ALTER COLUMN id SET DEFAULT nextval('public.favourite_task_id_seq'::regclass);


--
-- Name: google_form_task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_form_task ALTER COLUMN id SET DEFAULT nextval('public.google_form_task_id_seq'::regclass);


--
-- Name: integration id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.integration ALTER COLUMN id SET DEFAULT nextval('public.integration_id_seq'::regclass);


--
-- Name: notes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);


--
-- Name: notification_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_settings ALTER COLUMN id SET DEFAULT nextval('public.notification_settings_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: privacy_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privacy_settings ALTER COLUMN id SET DEFAULT nextval('public.privacy_settings_id_seq'::regclass);


--
-- Name: system_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_settings ALTER COLUMN id SET DEFAULT nextval('public.system_settings_id_seq'::regclass);


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- Name: user_notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_notifications ALTER COLUMN id SET DEFAULT nextval('public.user_notifications_id_seq'::regclass);


--
-- Name: user_preference id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preference ALTER COLUMN id SET DEFAULT nextval('public.user_preference_id_seq'::regclass);


--
-- Name: user_settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings ALTER COLUMN id SET DEFAULT nextval('public.user_settings_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_history (id, ai_response, "timestamp", user_prompt) FROM stdin;
\.


--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_messages (id, content, role, "timestamp", tokens_used, session_id) FROM stdin;
7ae39688-ec4b-464e-b049-9a38c8cba904	Hello	USER	2026-02-23 13:20:52.549452	\N	4ea1b5f9-b6d5-40e4-83dd-5260d10cca7f
7403624a-4d5e-4b2f-a32d-816d67c1be80	AI service is temporarily unavailable. Please try again later.	ASSISTANT	2026-02-23 13:20:54.770201	\N	4ea1b5f9-b6d5-40e4-83dd-5260d10cca7f
4e9ef346-aec0-4dd8-bb3a-4951649538c5	Hello	USER	2026-02-23 13:21:17.862721	\N	a5868f48-4dfc-4187-bea9-85197e1be042
14634ba9-7411-410a-a7f4-45a83319ff11	AI service is temporarily unavailable. Please try again later.	ASSISTANT	2026-02-23 13:21:18.377231	\N	a5868f48-4dfc-4187-bea9-85197e1be042
95b6cb60-52d5-4abc-a8d6-41b39e65dfa2	Hello	USER	2026-02-23 14:50:54.996805	\N	7f7b5607-f53c-4bbf-b261-130250d1e75b
94f804df-46af-41ba-b0ae-7bb6584e6676		ASSISTANT	2026-02-23 14:52:06.227033	\N	7f7b5607-f53c-4bbf-b261-130250d1e75b
\.


--
-- Data for Name: chat_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_sessions (id, created_at, title, updated_at) FROM stdin;
38400eb1-7b25-4a12-a435-9f320dd7d5cd	2026-02-23 12:19:22.872739	Test Chat	2026-02-23 12:19:22.872739
a5868f48-4dfc-4187-bea9-85197e1be042	2026-02-23 12:26:35.809246	Test Chat	2026-02-23 12:26:35.809246
4ea1b5f9-b6d5-40e4-83dd-5260d10cca7f	2026-02-23 13:20:52.502588	Hello	2026-02-23 13:20:52.502588
7f7b5607-f53c-4bbf-b261-130250d1e75b	2026-02-23 14:50:29.10888	Test Chat	2026-02-23 14:50:29.10888
\.


--
-- Data for Name: favourite_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favourite_task (id, task_id, user_id) FROM stdin;
3	2	1
4	4	1
\.


--
-- Data for Name: google_form_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.google_form_task (id, form_url, image_url, score, sheet_id, status, title) FROM stdin;
\.


--
-- Data for Name: integration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.integration (id, access_token, connected, provider, refresh_token, updated_at, user_id) FROM stdin;
1	3CxQRZkIhsZqsd/IEVhyuzqlpwg55stuPkg0swn3UXgdnvYot2TGVurK3C28YoJca20QyvgyhVdl3dQQf9GkGIXKlwBrOV1475Klr5vA5gSqJ5OQVgNcMxua/1wOvCjOFjSLDz80hj/3d6jmJ2QVEI+HRKIlfCQ44GGJCFKXMx3mUsYOAKU4YZ5tMzzdDKNfPAZzVh+2lakHcSn0x0AyiJyYC8+B6zRIZPffgWbJ1tYaACwTX8Ntr2Q3p0KikKHsZzpbEx8M9Tt5hvvXH/md9IOsXCh0HnT84nUJzJhzlEJcSUUuFap6Xbp76QdcRHi3UQA3sUGfUqPkPZE8bnGnbQ==	t	google	Qe6gUAPBbiiLFhYdgE0q7+EiMAHoqcSLRP8QNqI2ZX42GuYWPfByKLSS6CYcr0Tu70yO+eGiUL61jZE9s7KDVlpRwaiQFJjevVDnk1f92enXMmOHUB74kvla7fUuKa/4QkKFSvNt3Odik4gC//hc3Q==	2026-03-03 09:52:23.136914	1
2	93XM7Z7UdTXEhngK5+9fz6mgTKlTL3xk1aaVzVDTzhidJbbByiGxOWTgv3rVCnCX	t	github	\N	2026-03-06 19:24:32.402387	1
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notes (id, content, title) FROM stdin;
1	generics	java
2	pointer	c++
3	dsa	c
4	ml	python
5	game developement	c#
6	prompt engineering	Ai
\.


--
-- Data for Name: notification_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification_settings (id, email_enabled, in_app_enabled, notification_type, user_id) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, created_at, is_read, message, user_id) FROM stdin;
\.


--
-- Data for Name: privacy_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.privacy_settings (id, activity_hidden, allow_admins, allow_guests, allow_members, notify_comments, notify_task_changes, task_visibility, user_id) FROM stdin;
1	t	f	t	t	t	f	team	1
\.


--
-- Data for Name: system_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.system_settings (id, allow_user_registration, app_name, auto_archive_days, default_task_priority, enable_email_notifications, maintenance_mode, max_file_upload_size, uploaded_file_name) FROM stdin;
1	t	TMS System	15	HIGH	t	t	10	logo.jpg
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, description, due_date, google_form_url, image_url, score, status, title, assigned_user_id, completed_date, priority) FROM stdin;
14	DSA Multiple Choice Quiz- Quiz 10	2026-02-26	https://docs.google.com/forms/d/1wKzT9VH-LirpLsra6BOJiX2t17PhRmlE95jffrgaD7U/edit?usp=forms_home&ouid=111793118163715321769&ths=true	https://media.geeksforgeeks.org/img-practice/banner/dsa-online-thumbnail-old.png?v=1593109800	6	DONE	DSA Quiz	1	2026-02-26	HIGH
23	C Multiple Choice Quiz- Quiz 10	2026-03-20	https://tse4.mm.bing.net/th/id/OIP.tZGBv3IfpPh1NUgmcD6OMgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3	https://tse3.mm.bing.net/th/id/OIP.hbAQYxic5Szraz_l8Q8VCAHaEP?rs=1&pid=ImgDetMain&o=7&rm=3	9	DONE	C Quiz	5	2026-03-20	MEDIUM
17	Frontend   Multiple Choice Quiz- Quiz 10	2026-03-03	https://docs.google.com/forms/d/e/1FAIpQLScRbr-5BnoiLRvpf_dq41iYmtRcREpc1X6MvXz0l1vw4dkp1g/viewform?usp=publish-editor	https://img.freepik.com/premium-vector/front-end-software-development-programming-code-vector-illustration_123447-4093.jpg?w=1380	2	PENDING	Frontend   Quiz	3	2026-03-03	HIGH
20	Reactjs  Multiple Choice Quiz- Quiz 10	2026-03-04	https://docs.google.com/forms/d/e/1FAIpQLSeP_I0a1bLbeJyg-TB0cvq-5NjwtPE-WzP9fSVjekv2VCCdkA/viewform	https://images.hdqwalls.com/wallpapers/react-js-logo-no.jpg	7	DONE	Reactjs  Quiz	5	2026-03-04	HIGH
7	Complete Spring Boot Form	2026-03-05	https://docs.google.com/forms/d/e/1FAIpQLSeoBNtt9SOgbjqUoq1xBG5WBuVN0nJlegq5nLKliyKm2BXcsw/viewform?usp=publish-editor	https://wallpaperaccess.com/full/9954252.jpg	5	DONE	Spring Boot Quiz	\N	2026-03-06	HIGH
16	SQL  Multiple Choice Quiz- Quiz 10	2026-03-02	https://docs.google.com/forms/d/e/1FAIpQLScRbr-5BnoiLRvpf_dq41iYmtRcREpc1X6MvXz0l1vw4dkp1g/viewform?usp=publish-editor	https://th.bing.com/th/id/OIP.HWmkKdz2f3yqZceWW24lNAHaER?w=323&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3	8	DONE	SQL  Quiz	3	2026-03-02	MEDIUM
21	Computer Network  Multiple Choice Quiz- Quiz 10	2026-03-05	https://docs.google.com/forms/d/e/1FAIpQLSc-prYzSgEQrxzKHGAtYf_C9N_wanSm81j5L9vwnRwiAKz6vg/viewform	https://c8.alamy.com/comp/MKJ0E4/3d-rendering-computer-network-global-internet-concept-MKJ0E4.jpg	2	PENDING	Computer Network  Quiz	5	2026-03-06	MEDIUM
22	C++  Multiple Choice Quiz- Quiz 10	2026-03-05	https://docs.google.com/forms/d/1OuitMN2eVPcsR2ZuRunzoR1MSW1eRQ-Wz3dByX5z3xo/edit?usp=forms_home&ouid=111793118163715321769&ths=true	https://tse4.mm.bing.net/th/id/OIP.tpX_oz2mU2GaEuSjrq1c9QHaFj?w=640&h=480&rs=1&pid=ImgDetMain&o=7&rm=3	6	DONE	C++ Quiz	5	2026-03-06	LOW
10	Core Java Multiple Choice Quiz - Quiz 2	2026-02-27	https://docs.google.com/forms/d/e/1FAIpQLSewXv5_k9lEWOCzrtuBAZdZy9mjG0P9GW3G5BxwV0PAe90nIw/viewform?usp=dialog	https://nareshit.in/wp-content/uploads/2017/11/Core-Java-Training-NareshIT.jpg	5	DONE	Core Java Quiz	5	2026-02-27	MEDIUM
11	Python Multiple Choice Quiz - Quiz 3	2026-02-28	https://docs.google.com/forms/d/e/1FAIpQLSei1TqZxiFYHOfjtsogVNe9_A44U8UG6VfXd0BgV_-pofIVaQ/viewform?usp=publish-editor	https://1.bp.blogspot.com/-Xebi9TIZE0U/YNkiuTgWOpI/AAAAAAAAaos/ycEdx0NAZI0CAyb_-SC2MUMX8PjDXQVaQCLcBGAsYHQ/w640-h380/1_RJMxLdTHqVBSijKmOO5MAg.jpeg	1	PENDING	Python Quiz	4	2026-02-28	LOW
12	Operating System Multiple Choice Quiz- Quiz 11	2026-02-27	https://docs.google.com/forms/d/e/1FAIpQLSfamnPR4f7lQFPz3Hudn4fCRgz7SLAU1SxAda301voXhyb2Dg/viewform?usp=publish-editor	https://c8.alamy.com/comp/2G7N68G/diagram-concept-with-operating-system-text-and-keywords-eps-10-isolated-on-white-background-2G7N68G.jpg	7	DONE	Operating System Quiz	1	2026-02-27	MEDIUM
15	C# Multiple Choice Quiz- Quiz 10	2026-03-02	https://docs.google.com/forms/d/e/1FAIpQLSd38CfFhV6nlpf59yI7KIETr5QV6iXMqGjJnAMITm9CNtWMLg/viewform?usp=publish-editor	https://tse1.mm.bing.net/th/id/OIP.BL6oak2CToFdSXpG2MYowwHaHa?w=2500&h=2500&rs=1&pid=ImgDetMain&o=7&rm=3	8	DONE	C# Quiz	3	2026-03-02	LOW
\.


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todos (id, completed, text) FROM stdin;
1	f	SpringBoot Project
2	f	PostGreSql
3	f	ReactJs Project
4	f	Sql
5	f	DSA Problems
\.


--
-- Data for Name: user_notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_notifications (id, created_at, email_enabled, in_app_enabled, notification_type, push_enabled, updated_at, user_id) FROM stdin;
1	2026-02-14 11:22:58.229038	t	f	\N	f	2026-02-14 11:22:58.229038	1
2	2026-02-14 11:22:58.230041	t	f	\N	f	2026-02-14 11:22:58.230041	1
3	2026-02-14 11:22:58.230041	t	f	\N	f	2026-02-14 11:22:58.230041	1
4	2026-02-14 11:22:58.230041	t	f	\N	f	2026-02-14 11:22:58.230041	1
5	2026-02-14 11:22:58.230041	t	f	\N	f	2026-02-14 11:22:58.230041	1
6	2026-02-14 11:22:58.230041	t	f	\N	f	2026-02-14 11:22:58.230041	1
7	2026-02-14 11:22:58.231035	t	f	\N	f	2026-02-14 11:22:58.231035	1
8	2026-02-14 11:22:58.231035	t	f	\N	f	2026-02-14 11:22:58.231035	1
9	2026-02-14 11:22:58.231035	t	f	\N	f	2026-02-14 11:22:58.231035	1
10	2026-02-14 11:22:58.231035	t	f	\N	f	2026-02-14 11:22:58.231035	1
11	2026-02-14 11:22:58.231035	t	f	\N	f	2026-02-14 11:22:58.231035	1
12	2026-02-14 11:22:58.231035	t	f	\N	f	2026-02-14 11:22:58.231035	1
13	2026-02-14 11:36:44.174054	f	f	Task Assigned	f	2026-02-14 11:36:44.174054	1
14	2026-02-14 11:36:44.176051	f	f	Task Updated	f	2026-02-14 11:36:44.176051	1
15	2026-02-14 11:36:44.176051	f	f	Task Completed	f	2026-02-14 11:36:44.176051	1
16	2026-02-14 11:36:44.177045	f	f	Comment Added	f	2026-02-14 11:36:44.177045	1
17	2026-02-14 11:36:44.178051	f	f	Deadline Approaching	f	2026-02-14 11:36:44.178051	1
18	2026-02-14 11:36:44.178051	f	f	System Alerts	f	2026-02-14 11:36:44.178051	1
19	2026-02-14 11:36:44.178051	f	f	Mentions / Tags	f	2026-02-14 11:36:44.178051	1
20	2026-02-14 12:12:12.402745	t	t	Task Assigned	t	2026-02-14 12:12:12.402745	1
21	2026-02-14 12:12:12.407827	f	f	Task Updated	f	2026-02-14 12:12:12.407827	1
22	2026-02-14 12:12:12.407827	f	f	Task Completed	f	2026-02-14 12:12:12.407827	1
23	2026-02-14 12:12:12.407827	f	f	Comment Added	f	2026-02-14 12:12:12.407827	1
24	2026-02-14 12:12:12.407827	f	f	Deadline Approaching	f	2026-02-14 12:12:12.407827	1
25	2026-02-14 12:12:12.407827	f	f	System Alerts	f	2026-02-14 12:12:12.407827	1
26	2026-02-14 12:12:12.407827	f	f	Mentions / Tags	f	2026-02-14 12:12:12.407827	1
\.


--
-- Data for Name: user_preference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_preference (id, default_task_filter, email_notifications, language, theme, user_id) FROM stdin;
\.


--
-- Data for Name: user_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_settings (id, auto_archive_completed, dark_mode, data_export_allowed, default_task_status, default_task_view, email_integration, email_notifications, google_calendar_sync, in_app_notifications, language, notification_frequency, sms_enabled, time_zone, two_factor_enabled, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, email, name, user_password, sms_enabled) FROM stdin;
1	franklin@gmail.com	1	123456789	f
2	franklinsurya@gmail.com	2	123456789	f
3	surya@gmail.com	3	123456789	t
4	frank@gmail.com	4	123456789	t
5	franksurya@gmail.com	5	123456789	f
6	franklin4@gmail.com	frank	$2a$10$eNBPYfUGnFttfD8tvEL8o.R6bRyaSLhIwyM4HE333gcbmZQPxNoIi	f
7	surya4@gmail.com	surya	$2a$10$B.pCM0N0f3YWnC7V06ioIOHesPBzhmd5YRw9cguUg7XOklHqjoNkq	f
\.


--
-- Name: chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_history_id_seq', 1, false);


--
-- Name: favourite_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favourite_task_id_seq', 4, true);


--
-- Name: google_form_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.google_form_task_id_seq', 1, false);


--
-- Name: integration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.integration_id_seq', 2, true);


--
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notes_id_seq', 6, true);


--
-- Name: notification_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_settings_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: privacy_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.privacy_settings_id_seq', 1, true);


--
-- Name: system_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.system_settings_id_seq', 1, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_id_seq', 23, true);


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todos_id_seq', 5, true);


--
-- Name: user_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_notifications_id_seq', 26, true);


--
-- Name: user_preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_preference_id_seq', 1, false);


--
-- Name: user_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_settings_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- Name: chat_history chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history
    ADD CONSTRAINT chat_history_pkey PRIMARY KEY (id);


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: chat_sessions chat_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_sessions
    ADD CONSTRAINT chat_sessions_pkey PRIMARY KEY (id);


--
-- Name: favourite_task favourite_task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourite_task
    ADD CONSTRAINT favourite_task_pkey PRIMARY KEY (id);


--
-- Name: google_form_task google_form_task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_form_task
    ADD CONSTRAINT google_form_task_pkey PRIMARY KEY (id);


--
-- Name: integration integration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.integration
    ADD CONSTRAINT integration_pkey PRIMARY KEY (id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: notification_settings notification_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_settings
    ADD CONSTRAINT notification_settings_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: privacy_settings privacy_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privacy_settings
    ADD CONSTRAINT privacy_settings_pkey PRIMARY KEY (id);


--
-- Name: system_settings system_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_settings
    ADD CONSTRAINT system_settings_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: user_settings uk_4bos7satl9xeqd18frfeqg6tt; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT uk_4bos7satl9xeqd18frfeqg6tt UNIQUE (user_id);


--
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: user_notifications user_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_notifications
    ADD CONSTRAINT user_notifications_pkey PRIMARY KEY (id);


--
-- Name: user_preference user_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: chat_messages fk3cpkdtwdxndrjhrx3gt9q5ux9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT fk3cpkdtwdxndrjhrx3gt9q5ux9 FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id);


--
-- Name: user_settings fk8v82nj88rmai0nyck19f873dw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT fk8v82nj88rmai0nyck19f873dw FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: task fkg2fon1f6hw8y0g6sl4gvp0vmf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT fkg2fon1f6hw8y0g6sl4gvp0vmf FOREIGN KEY (assigned_user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

\unrestrict vpY3KN6xMy8O2w6RKGqeeoeJKSBjx9hxeC1BbAB1FxVxowMuqfWfvqvhixIBzp8

