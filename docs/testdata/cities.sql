--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

--
-- Name: Cities; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public."Cities" (
--     id integer NOT NULL,
--     name character varying(255),
--     state_id integer NOT NULL,
--     state_code character varying(255),
--     country_id integer NOT NULL,
--     country_code character varying(255),
--     latitude numeric,
--     longitude numeric,
--     flag integer,
--     "wikiDataId" character varying(255),
--     "createdAt" timestamp with time zone NOT NULL,
--     "updatedAt" timestamp with time zone NOT NULL
-- );


-- ALTER TABLE public."Cities" OWNER TO postgres;

--
-- Name: Cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- CREATE SEQUENCE public."Cities_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER TABLE public."Cities_id_seq" OWNER TO postgres;

--
-- Name: Cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cities_id_seq" OWNED BY public."Cities".id;


--
-- Name: Cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cities" ALTER COLUMN id SET DEFAULT nextval('public."Cities_id_seq"'::regclass);


--
-- Data for Name: Cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cities" VALUES (1, 'Andorra la Vella', 1, '01', 1, 'AD', 42.50779000, 1.52109000, 1, 'Q1863', '2019-10-05 18:28:06-05', '2019-10-05 18:28:06-05');



--
-- Name: Cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cities_id_seq"', 2, false);


--
-- Name: Cities Cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Cities"
--     ADD CONSTRAINT "Cities_pkey" PRIMARY KEY (id);


--
-- Name: Cities Cities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Cities"
--     ADD CONSTRAINT "Cities_country_id_fkey" FOREIGN KEY (country_id) REFERENCES public."Countries"(id);


--
-- Name: Cities Cities_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public."Cities"
--     ADD CONSTRAINT "Cities_state_id_fkey" FOREIGN KEY (state_id) REFERENCES public."States"(id);


--
-- PostgreSQL database dump complete
--