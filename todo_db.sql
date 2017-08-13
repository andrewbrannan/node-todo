--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: list; Type: TABLE; Schema: public; Owner: andrewbrannan
--

CREATE TABLE list (
    id integer NOT NULL,
    task character varying(256),
    done boolean
);


ALTER TABLE list OWNER TO andrewbrannan;

--
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: andrewbrannan
--

CREATE SEQUENCE list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE list_id_seq OWNER TO andrewbrannan;

--
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andrewbrannan
--

ALTER SEQUENCE list_id_seq OWNED BY list.id;


--
-- Name: list id; Type: DEFAULT; Schema: public; Owner: andrewbrannan
--

ALTER TABLE ONLY list ALTER COLUMN id SET DEFAULT nextval('list_id_seq'::regclass);


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: andrewbrannan
--

COPY list (id, task, done) FROM stdin;
\.


--
-- Name: list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andrewbrannan
--

SELECT pg_catalog.setval('list_id_seq', 2, true);


--
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: andrewbrannan
--

ALTER TABLE ONLY list
    ADD CONSTRAINT list_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

