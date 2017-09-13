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

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

-- Table holding all todo items

CREATE TABLE list (
    id integer NOT NULL,
    task character varying(256),
    is_completed boolean,
    user_id character varying(256)
);

ALTER TABLE list OWNER TO andrewbrannan;

CREATE SEQUENCE list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE list_id_seq OWNER TO andrewbrannan;

ALTER SEQUENCE list_id_seq OWNED BY list.id;

ALTER TABLE ONLY list ALTER COLUMN id SET DEFAULT nextval('list_id_seq'::regclass);

COPY list (id, task, is_completed) FROM stdin;
\.

SELECT pg_catalog.setval('list_id_seq', 0, true);

-- Table holding all users
CREATE TABLE users (
    user_id character varying(256),
    hash character varying(256),
    is_admin boolean
);

ALTER TABLE users OWNER TO andrewbrannan;
