--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Countries" (
    id integer NOT NULL,
    name character varying(255),
    iso3 character varying(255),
    iso2 character varying(255),
    phonecode character varying(255),
    capital character varying(255),
    currency character varying(255),
    native character varying(255),
    region character varying(255),
    subregion character varying(255),
    emoji character varying(255),
    "emojiU" character varying(255),
    flag integer,
    "wikiDataId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Countries" OWNER TO postgres;

--
-- Name: Countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Countries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Countries_id_seq" OWNER TO postgres;

--
-- Name: Countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Countries_id_seq" OWNED BY public."Countries".id;


--
-- Name: Countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries" ALTER COLUMN id SET DEFAULT nextval('public."Countries_id_seq"'::regclass);


--
-- Data for Name: Countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Countries" VALUES (1, 'Afghanistan', 'AFG', 'AF', '93', 'Kabul', 'AFN', 'افغانستان', 'Asia', 'Southern Asia', '🇦🇫', 'U+1F1E6 U+1F1EB', 1, 'Q889', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (2, 'Aland Islands', 'ALA', 'AX', '+358-18', 'Mariehamn', 'EUR', 'Åland', 'Europe', 'Northern Europe', '🇦🇽', 'U+1F1E6 U+1F1FD', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (3, 'Albania', 'ALB', 'AL', '355', 'Tirana', 'ALL', 'Shqipëria', 'Europe', 'Southern Europe', '🇦🇱', 'U+1F1E6 U+1F1F1', 1, 'Q222', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (4, 'Algeria', 'DZA', 'DZ', '213', 'Algiers', 'DZD', 'الجزائر', 'Africa', 'Northern Africa', '🇩🇿', 'U+1F1E9 U+1F1FF', 1, 'Q262', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (5, 'American Samoa', 'ASM', 'AS', '+1-684', 'Pago Pago', 'USD', 'American Samoa', 'Oceania', 'Polynesia', '🇦🇸', 'U+1F1E6 U+1F1F8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (6, 'Andorra', 'AND', 'AD', '376', 'Andorra la Vella', 'EUR', 'Andorra', 'Europe', 'Southern Europe', '🇦🇩', 'U+1F1E6 U+1F1E9', 1, 'Q228', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (7, 'Angola', 'AGO', 'AO', '244', 'Luanda', 'AOA', 'Angola', 'Africa', 'Middle Africa', '🇦🇴', 'U+1F1E6 U+1F1F4', 1, 'Q916', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (8, 'Anguilla', 'AIA', 'AI', '+1-264', 'The Valley', 'XCD', 'Anguilla', 'Americas', 'Caribbean', '🇦🇮', 'U+1F1E6 U+1F1EE', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (9, 'Antarctica', 'ATA', 'AQ', '', '', '', 'Antarctica', 'Polar', '', '🇦🇶', 'U+1F1E6 U+1F1F6', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (10, 'Antigua And Barbuda', 'ATG', 'AG', '+1-268', 'St. Johns', 'XCD', 'Antigua and Barbuda', 'Americas', 'Caribbean', '🇦🇬', 'U+1F1E6 U+1F1EC', 1, 'Q781', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (11, 'Argentina', 'ARG', 'AR', '54', 'Buenos Aires', 'ARS', 'Argentina', 'Americas', 'South America', '🇦🇷', 'U+1F1E6 U+1F1F7', 1, 'Q414', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (12, 'Armenia', 'ARM', 'AM', '374', 'Yerevan', 'AMD', 'Հայաստան', 'Asia', 'Western Asia', '🇦🇲', 'U+1F1E6 U+1F1F2', 1, 'Q399', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (13, 'Aruba', 'ABW', 'AW', '297', 'Oranjestad', 'AWG', 'Aruba', 'Americas', 'Caribbean', '🇦🇼', 'U+1F1E6 U+1F1FC', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (14, 'Australia', 'AUS', 'AU', '61', 'Canberra', 'AUD', 'Australia', 'Oceania', 'Australia and New Zealand', '🇦🇺', 'U+1F1E6 U+1F1FA', 1, 'Q408', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (15, 'Austria', 'AUT', 'AT', '43', 'Vienna', 'EUR', 'Österreich', 'Europe', 'Western Europe', '🇦🇹', 'U+1F1E6 U+1F1F9', 1, 'Q40', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (16, 'Azerbaijan', 'AZE', 'AZ', '994', 'Baku', 'AZN', 'Azərbaycan', 'Asia', 'Western Asia', '🇦🇿', 'U+1F1E6 U+1F1FF', 1, 'Q227', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (17, 'Bahamas The', 'BHS', 'BS', '+1-242', 'Nassau', 'BSD', 'Bahamas', 'Americas', 'Caribbean', '🇧🇸', 'U+1F1E7 U+1F1F8', 1, 'Q778', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (18, 'Bahrain', 'BHR', 'BH', '973', 'Manama', 'BHD', '‏البحرين', 'Asia', 'Western Asia', '🇧🇭', 'U+1F1E7 U+1F1ED', 1, 'Q398', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (19, 'Bangladesh', 'BGD', 'BD', '880', 'Dhaka', 'BDT', 'Bangladesh', 'Asia', 'Southern Asia', '🇧🇩', 'U+1F1E7 U+1F1E9', 1, 'Q902', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (20, 'Barbados', 'BRB', 'BB', '+1-246', 'Bridgetown', 'BBD', 'Barbados', 'Americas', 'Caribbean', '🇧🇧', 'U+1F1E7 U+1F1E7', 1, 'Q244', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (21, 'Belarus', 'BLR', 'BY', '375', 'Minsk', 'BYN', 'Белару́сь', 'Europe', 'Eastern Europe', '🇧🇾', 'U+1F1E7 U+1F1FE', 1, 'Q184', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (22, 'Belgium', 'BEL', 'BE', '32', 'Brussels', 'EUR', 'België', 'Europe', 'Western Europe', '🇧🇪', 'U+1F1E7 U+1F1EA', 1, 'Q31', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (23, 'Belize', 'BLZ', 'BZ', '501', 'Belmopan', 'BZD', 'Belize', 'Americas', 'Central America', '🇧🇿', 'U+1F1E7 U+1F1FF', 1, 'Q242', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (24, 'Benin', 'BEN', 'BJ', '229', 'Porto-Novo', 'XOF', 'Bénin', 'Africa', 'Western Africa', '🇧🇯', 'U+1F1E7 U+1F1EF', 1, 'Q962', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (25, 'Bermuda', 'BMU', 'BM', '+1-441', 'Hamilton', 'BMD', 'Bermuda', 'Americas', 'Northern America', '🇧🇲', 'U+1F1E7 U+1F1F2', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (26, 'Bhutan', 'BTN', 'BT', '975', 'Thimphu', 'BTN', 'ʼbrug-yul', 'Asia', 'Southern Asia', '🇧🇹', 'U+1F1E7 U+1F1F9', 1, 'Q917', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (27, 'Bolivia', 'BOL', 'BO', '591', 'Sucre', 'BOB', 'Bolivia', 'Americas', 'South America', '🇧🇴', 'U+1F1E7 U+1F1F4', 1, 'Q750', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (28, 'Bosnia and Herzegovina', 'BIH', 'BA', '387', 'Sarajevo', 'BAM', 'Bosna i Hercegovina', 'Europe', 'Southern Europe', '🇧🇦', 'U+1F1E7 U+1F1E6', 1, 'Q225', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (29, 'Botswana', 'BWA', 'BW', '267', 'Gaborone', 'BWP', 'Botswana', 'Africa', 'Southern Africa', '🇧🇼', 'U+1F1E7 U+1F1FC', 1, 'Q963', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (30, 'Bouvet Island', 'BVT', 'BV', '', '', 'NOK', 'Bouvetøya', '', '', '🇧🇻', 'U+1F1E7 U+1F1FB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (31, 'Brazil', 'BRA', 'BR', '55', 'Brasilia', 'BRL', 'Brasil', 'Americas', 'South America', '🇧🇷', 'U+1F1E7 U+1F1F7', 1, 'Q155', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (32, 'British Indian Ocean Territory', 'IOT', 'IO', '246', 'Diego Garcia', 'USD', 'British Indian Ocean Territory', 'Africa', 'Eastern Africa', '🇮🇴', 'U+1F1EE U+1F1F4', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (33, 'Brunei', 'BRN', 'BN', '673', 'Bandar Seri Begawan', 'BND', 'Negara Brunei Darussalam', 'Asia', 'South-Eastern Asia', '🇧🇳', 'U+1F1E7 U+1F1F3', 1, 'Q921', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (34, 'Bulgaria', 'BGR', 'BG', '359', 'Sofia', 'BGN', 'България', 'Europe', 'Eastern Europe', '🇧🇬', 'U+1F1E7 U+1F1EC', 1, 'Q219', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (35, 'Burkina Faso', 'BFA', 'BF', '226', 'Ouagadougou', 'XOF', 'Burkina Faso', 'Africa', 'Western Africa', '🇧🇫', 'U+1F1E7 U+1F1EB', 1, 'Q965', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (36, 'Burundi', 'BDI', 'BI', '257', 'Bujumbura', 'BIF', 'Burundi', 'Africa', 'Eastern Africa', '🇧🇮', 'U+1F1E7 U+1F1EE', 1, 'Q967', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (37, 'Cambodia', 'KHM', 'KH', '855', 'Phnom Penh', 'KHR', 'Kâmpŭchéa', 'Asia', 'South-Eastern Asia', '🇰🇭', 'U+1F1F0 U+1F1ED', 1, 'Q424', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (38, 'Cameroon', 'CMR', 'CM', '237', 'Yaounde', 'XAF', 'Cameroon', 'Africa', 'Middle Africa', '🇨🇲', 'U+1F1E8 U+1F1F2', 1, 'Q1009', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (39, 'Canada', 'CAN', 'CA', '1', 'Ottawa', 'CAD', 'Canada', 'Americas', 'Northern America', '🇨🇦', 'U+1F1E8 U+1F1E6', 1, 'Q16', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (40, 'Cape Verde', 'CPV', 'CV', '238', 'Praia', 'CVE', 'Cabo Verde', 'Africa', 'Western Africa', '🇨🇻', 'U+1F1E8 U+1F1FB', 1, 'Q1011', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (41, 'Cayman Islands', 'CYM', 'KY', '+1-345', 'George Town', 'KYD', 'Cayman Islands', 'Americas', 'Caribbean', '🇰🇾', 'U+1F1F0 U+1F1FE', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (42, 'Central African Republic', 'CAF', 'CF', '236', 'Bangui', 'XAF', 'Ködörösêse tî Bêafrîka', 'Africa', 'Middle Africa', '🇨🇫', 'U+1F1E8 U+1F1EB', 1, 'Q929', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (43, 'Chad', 'TCD', 'TD', '235', 'NDjamena', 'XAF', 'Tchad', 'Africa', 'Middle Africa', '🇹🇩', 'U+1F1F9 U+1F1E9', 1, 'Q657', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (44, 'Chile', 'CHL', 'CL', '56', 'Santiago', 'CLP', 'Chile', 'Americas', 'South America', '🇨🇱', 'U+1F1E8 U+1F1F1', 1, 'Q298', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (45, 'China', 'CHN', 'CN', '86', 'Beijing', 'CNY', '中国', 'Asia', 'Eastern Asia', '🇨🇳', 'U+1F1E8 U+1F1F3', 1, 'Q148', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (46, 'Christmas Island', 'CXR', 'CX', '61', 'Flying Fish Cove', 'AUD', 'Christmas Island', 'Oceania', 'Australia and New Zealand', '🇨🇽', 'U+1F1E8 U+1F1FD', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (47, 'Cocos (Keeling) Islands', 'CCK', 'CC', '61', 'West Island', 'AUD', 'Cocos (Keeling) Islands', 'Oceania', 'Australia and New Zealand', '🇨🇨', 'U+1F1E8 U+1F1E8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (48, 'Colombia', 'COL', 'CO', '57', 'Bogota', 'COP', 'Colombia', 'Americas', 'South America', '🇨🇴', 'U+1F1E8 U+1F1F4', 1, 'Q739', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (49, 'Comoros', 'COM', 'KM', '269', 'Moroni', 'KMF', 'Komori', 'Africa', 'Eastern Africa', '🇰🇲', 'U+1F1F0 U+1F1F2', 1, 'Q970', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (50, 'Congo', 'COG', 'CG', '242', 'Brazzaville', 'XAF', 'République du Congo', 'Africa', 'Middle Africa', '🇨🇬', 'U+1F1E8 U+1F1EC', 1, 'Q971', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (51, 'Congo The Democratic Republic Of The', 'COD', 'CD', '243', 'Kinshasa', 'CDF', 'République démocratique du Congo', 'Africa', 'Middle Africa', '🇨🇩', 'U+1F1E8 U+1F1E9', 1, 'Q974', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (52, 'Cook Islands', 'COK', 'CK', '682', 'Avarua', 'NZD', 'Cook Islands', 'Oceania', 'Polynesia', '🇨🇰', 'U+1F1E8 U+1F1F0', 1, 'Q26988', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (53, 'Costa Rica', 'CRI', 'CR', '506', 'San Jose', 'CRC', 'Costa Rica', 'Americas', 'Central America', '🇨🇷', 'U+1F1E8 U+1F1F7', 1, 'Q800', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (54, 'Cote DIvoire (Ivory Coast)', 'CIV', 'CI', '225', 'Yamoussoukro', 'XOF', NULL, 'Africa', 'Western Africa', '🇨🇮', 'U+1F1E8 U+1F1EE', 1, 'Q1008', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (55, 'Croatia (Hrvatska)', 'HRV', 'HR', '385', 'Zagreb', 'HRK', 'Hrvatska', 'Europe', 'Southern Europe', '🇭🇷', 'U+1F1ED U+1F1F7', 1, 'Q224', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (56, 'Cuba', 'CUB', 'CU', '53', 'Havana', 'CUP', 'Cuba', 'Americas', 'Caribbean', '🇨🇺', 'U+1F1E8 U+1F1FA', 1, 'Q241', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (57, 'Cyprus', 'CYP', 'CY', '357', 'Nicosia', 'EUR', 'Κύπρος', 'Europe', 'Southern Europe', '🇨🇾', 'U+1F1E8 U+1F1FE', 1, 'Q229', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (58, 'Czech Republic', 'CZE', 'CZ', '420', 'Prague', 'CZK', 'Česká republika', 'Europe', 'Eastern Europe', '🇨🇿', 'U+1F1E8 U+1F1FF', 1, 'Q213', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (59, 'Denmark', 'DNK', 'DK', '45', 'Copenhagen', 'DKK', 'Danmark', 'Europe', 'Northern Europe', '🇩🇰', 'U+1F1E9 U+1F1F0', 1, 'Q35', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (60, 'Djibouti', 'DJI', 'DJ', '253', 'Djibouti', 'DJF', 'Djibouti', 'Africa', 'Eastern Africa', '🇩🇯', 'U+1F1E9 U+1F1EF', 1, 'Q977', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (61, 'Dominica', 'DMA', 'DM', '+1-767', 'Roseau', 'XCD', 'Dominica', 'Americas', 'Caribbean', '🇩🇲', 'U+1F1E9 U+1F1F2', 1, 'Q784', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (62, 'Dominican Republic', 'DOM', 'DO', '+1-809 and 1-829', 'Santo Domingo', 'DOP', 'República Dominicana', 'Americas', 'Caribbean', '🇩🇴', 'U+1F1E9 U+1F1F4', 1, 'Q786', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (63, 'East Timor', 'TLS', 'TL', '670', 'Dili', 'USD', 'Timor-Leste', 'Asia', 'South-Eastern Asia', '🇹🇱', 'U+1F1F9 U+1F1F1', 1, 'Q574', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (64, 'Ecuador', 'ECU', 'EC', '593', 'Quito', 'USD', 'Ecuador', 'Americas', 'South America', '🇪🇨', 'U+1F1EA U+1F1E8', 1, 'Q736', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (65, 'Egypt', 'EGY', 'EG', '20', 'Cairo', 'EGP', 'مصر‎', 'Africa', 'Northern Africa', '🇪🇬', 'U+1F1EA U+1F1EC', 1, 'Q79', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (66, 'El Salvador', 'SLV', 'SV', '503', 'San Salvador', 'USD', 'El Salvador', 'Americas', 'Central America', '🇸🇻', 'U+1F1F8 U+1F1FB', 1, 'Q792', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (67, 'Equatorial Guinea', 'GNQ', 'GQ', '240', 'Malabo', 'XAF', 'Guinea Ecuatorial', 'Africa', 'Middle Africa', '🇬🇶', 'U+1F1EC U+1F1F6', 1, 'Q983', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (68, 'Eritrea', 'ERI', 'ER', '291', 'Asmara', 'ERN', 'ኤርትራ', 'Africa', 'Eastern Africa', '🇪🇷', 'U+1F1EA U+1F1F7', 1, 'Q986', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (69, 'Estonia', 'EST', 'EE', '372', 'Tallinn', 'EUR', 'Eesti', 'Europe', 'Northern Europe', '🇪🇪', 'U+1F1EA U+1F1EA', 1, 'Q191', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (70, 'Ethiopia', 'ETH', 'ET', '251', 'Addis Ababa', 'ETB', 'ኢትዮጵያ', 'Africa', 'Eastern Africa', '🇪🇹', 'U+1F1EA U+1F1F9', 1, 'Q115', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (71, 'Falkland Islands', 'FLK', 'FK', '500', 'Stanley', 'FKP', 'Falkland Islands', 'Americas', 'South America', '🇫🇰', 'U+1F1EB U+1F1F0', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (72, 'Faroe Islands', 'FRO', 'FO', '298', 'Torshavn', 'DKK', 'Føroyar', 'Europe', 'Northern Europe', '🇫🇴', 'U+1F1EB U+1F1F4', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (73, 'Fiji Islands', 'FJI', 'FJ', '679', 'Suva', 'FJD', 'Fiji', 'Oceania', 'Melanesia', '🇫🇯', 'U+1F1EB U+1F1EF', 1, 'Q712', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (74, 'Finland', 'FIN', 'FI', '358', 'Helsinki', 'EUR', 'Suomi', 'Europe', 'Northern Europe', '🇫🇮', 'U+1F1EB U+1F1EE', 1, 'Q33', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (75, 'France', 'FRA', 'FR', '33', 'Paris', 'EUR', 'France', 'Europe', 'Western Europe', '🇫🇷', 'U+1F1EB U+1F1F7', 1, 'Q142', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (76, 'French Guiana', 'GUF', 'GF', '594', 'Cayenne', 'EUR', 'Guyane française', 'Americas', 'South America', '🇬🇫', 'U+1F1EC U+1F1EB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (77, 'French Polynesia', 'PYF', 'PF', '689', 'Papeete', 'XPF', 'Polynésie française', 'Oceania', 'Polynesia', '🇵🇫', 'U+1F1F5 U+1F1EB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (78, 'French Southern Territories', 'ATF', 'TF', '', 'Port-aux-Francais', 'EUR', 'Territoire des Terres australes et antarctiques fr', 'Africa', 'Southern Africa', '🇹🇫', 'U+1F1F9 U+1F1EB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (79, 'Gabon', 'GAB', 'GA', '241', 'Libreville', 'XAF', 'Gabon', 'Africa', 'Middle Africa', '🇬🇦', 'U+1F1EC U+1F1E6', 1, 'Q1000', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (80, 'Gambia The', 'GMB', 'GM', '220', 'Banjul', 'GMD', 'Gambia', 'Africa', 'Western Africa', '🇬🇲', 'U+1F1EC U+1F1F2', 1, 'Q1005', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (81, 'Georgia', 'GEO', 'GE', '995', 'Tbilisi', 'GEL', 'საქართველო', 'Asia', 'Western Asia', '🇬🇪', 'U+1F1EC U+1F1EA', 1, 'Q230', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (82, 'Germany', 'DEU', 'DE', '49', 'Berlin', 'EUR', 'Deutschland', 'Europe', 'Western Europe', '🇩🇪', 'U+1F1E9 U+1F1EA', 1, 'Q183', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (83, 'Ghana', 'GHA', 'GH', '233', 'Accra', 'GHS', 'Ghana', 'Africa', 'Western Africa', '🇬🇭', 'U+1F1EC U+1F1ED', 1, 'Q117', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (84, 'Gibraltar', 'GIB', 'GI', '350', 'Gibraltar', 'GIP', 'Gibraltar', 'Europe', 'Southern Europe', '🇬🇮', 'U+1F1EC U+1F1EE', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (85, 'Greece', 'GRC', 'GR', '30', 'Athens', 'EUR', 'Ελλάδα', 'Europe', 'Southern Europe', '🇬🇷', 'U+1F1EC U+1F1F7', 1, 'Q41', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (86, 'Greenland', 'GRL', 'GL', '299', 'Nuuk', 'DKK', 'Kalaallit Nunaat', 'Americas', 'Northern America', '🇬🇱', 'U+1F1EC U+1F1F1', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (87, 'Grenada', 'GRD', 'GD', '+1-473', 'St. Georges', 'XCD', 'Grenada', 'Americas', 'Caribbean', '🇬🇩', 'U+1F1EC U+1F1E9', 1, 'Q769', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (88, 'Guadeloupe', 'GLP', 'GP', '590', 'Basse-Terre', 'EUR', 'Guadeloupe', 'Americas', 'Caribbean', '🇬🇵', 'U+1F1EC U+1F1F5', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (89, 'Guam', 'GUM', 'GU', '+1-671', 'Hagatna', 'USD', 'Guam', 'Oceania', 'Micronesia', '🇬🇺', 'U+1F1EC U+1F1FA', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (90, 'Guatemala', 'GTM', 'GT', '502', 'Guatemala City', 'GTQ', 'Guatemala', 'Americas', 'Central America', '🇬🇹', 'U+1F1EC U+1F1F9', 1, 'Q774', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (91, 'Guernsey and Alderney', 'GGY', 'GG', '+44-1481', 'St Peter Port', 'GBP', 'Guernsey', 'Europe', 'Northern Europe', '🇬🇬', 'U+1F1EC U+1F1EC', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (92, 'Guinea', 'GIN', 'GN', '224', 'Conakry', 'GNF', 'Guinée', 'Africa', 'Western Africa', '🇬🇳', 'U+1F1EC U+1F1F3', 1, 'Q1006', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (93, 'Guinea-Bissau', 'GNB', 'GW', '245', 'Bissau', 'XOF', 'Guiné-Bissau', 'Africa', 'Western Africa', '🇬🇼', 'U+1F1EC U+1F1FC', 1, 'Q1007', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (94, 'Guyana', 'GUY', 'GY', '592', 'Georgetown', 'GYD', 'Guyana', 'Americas', 'South America', '🇬🇾', 'U+1F1EC U+1F1FE', 1, 'Q734', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (95, 'Haiti', 'HTI', 'HT', '509', 'Port-au-Prince', 'HTG', 'Haïti', 'Americas', 'Caribbean', '🇭🇹', 'U+1F1ED U+1F1F9', 1, 'Q790', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (96, 'Heard and McDonald Islands', 'HMD', 'HM', ' ', '', 'AUD', 'Heard Island and McDonald Islands', '', '', '🇭🇲', 'U+1F1ED U+1F1F2', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (97, 'Honduras', 'HND', 'HN', '504', 'Tegucigalpa', 'HNL', 'Honduras', 'Americas', 'Central America', '🇭🇳', 'U+1F1ED U+1F1F3', 1, 'Q783', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (98, 'Hong Kong S.A.R.', 'HKG', 'HK', '852', 'Hong Kong', 'HKD', '香港', 'Asia', 'Eastern Asia', '🇭🇰', 'U+1F1ED U+1F1F0', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (99, 'Hungary', 'HUN', 'HU', '36', 'Budapest', 'HUF', 'Magyarország', 'Europe', 'Eastern Europe', '🇭🇺', 'U+1F1ED U+1F1FA', 1, 'Q28', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (100, 'Iceland', 'ISL', 'IS', '354', 'Reykjavik', 'ISK', 'Ísland', 'Europe', 'Northern Europe', '🇮🇸', 'U+1F1EE U+1F1F8', 1, 'Q189', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (101, 'India', 'IND', 'IN', '91', 'New Delhi', 'INR', 'भारत', 'Asia', 'Southern Asia', '🇮🇳', 'U+1F1EE U+1F1F3', 1, 'Q668', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (102, 'Indonesia', 'IDN', 'ID', '62', 'Jakarta', 'IDR', 'Indonesia', 'Asia', 'South-Eastern Asia', '🇮🇩', 'U+1F1EE U+1F1E9', 1, 'Q252', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (103, 'Iran', 'IRN', 'IR', '98', 'Tehran', 'IRR', 'ایران', 'Asia', 'Southern Asia', '🇮🇷', 'U+1F1EE U+1F1F7', 1, 'Q794', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (104, 'Iraq', 'IRQ', 'IQ', '964', 'Baghdad', 'IQD', 'العراق', 'Asia', 'Western Asia', '🇮🇶', 'U+1F1EE U+1F1F6', 1, 'Q796', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (105, 'Ireland', 'IRL', 'IE', '353', 'Dublin', 'EUR', 'Éire', 'Europe', 'Northern Europe', '🇮🇪', 'U+1F1EE U+1F1EA', 1, 'Q27', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (106, 'Israel', 'ISR', 'IL', '972', 'Jerusalem', 'ILS', 'יִשְׂרָאֵל', 'Asia', 'Western Asia', '🇮🇱', 'U+1F1EE U+1F1F1', 1, 'Q801', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (107, 'Italy', 'ITA', 'IT', '39', 'Rome', 'EUR', 'Italia', 'Europe', 'Southern Europe', '🇮🇹', 'U+1F1EE U+1F1F9', 1, 'Q38', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (108, 'Jamaica', 'JAM', 'JM', '+1-876', 'Kingston', 'JMD', 'Jamaica', 'Americas', 'Caribbean', '🇯🇲', 'U+1F1EF U+1F1F2', 1, 'Q766', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (109, 'Japan', 'JPN', 'JP', '81', 'Tokyo', 'JPY', '日本', 'Asia', 'Eastern Asia', '🇯🇵', 'U+1F1EF U+1F1F5', 1, 'Q17', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (110, 'Jersey', 'JEY', 'JE', '+44-1534', 'Saint Helier', 'GBP', 'Jersey', 'Europe', 'Northern Europe', '🇯🇪', 'U+1F1EF U+1F1EA', 1, 'Q785', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (111, 'Jordan', 'JOR', 'JO', '962', 'Amman', 'JOD', 'الأردن', 'Asia', 'Western Asia', '🇯🇴', 'U+1F1EF U+1F1F4', 1, 'Q810', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (112, 'Kazakhstan', 'KAZ', 'KZ', '7', 'Astana', 'KZT', 'Қазақстан', 'Asia', 'Central Asia', '🇰🇿', 'U+1F1F0 U+1F1FF', 1, 'Q232', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (113, 'Kenya', 'KEN', 'KE', '254', 'Nairobi', 'KES', 'Kenya', 'Africa', 'Eastern Africa', '🇰🇪', 'U+1F1F0 U+1F1EA', 1, 'Q114', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (114, 'Kiribati', 'KIR', 'KI', '686', 'Tarawa', 'AUD', 'Kiribati', 'Oceania', 'Micronesia', '🇰🇮', 'U+1F1F0 U+1F1EE', 1, 'Q710', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (115, 'Korea North', 'PRK', 'KP', '850', 'Pyongyang', 'KPW', '북한', 'Asia', 'Eastern Asia', '🇰🇵', 'U+1F1F0 U+1F1F5', 1, 'Q423', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (116, 'Korea South', 'KOR', 'KR', '82', 'Seoul', 'KRW', '대한민국', 'Asia', 'Eastern Asia', '🇰🇷', 'U+1F1F0 U+1F1F7', 1, 'Q884', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (117, 'Kuwait', 'KWT', 'KW', '965', 'Kuwait City', 'KWD', 'الكويت', 'Asia', 'Western Asia', '🇰🇼', 'U+1F1F0 U+1F1FC', 1, 'Q817', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (118, 'Kyrgyzstan', 'KGZ', 'KG', '996', 'Bishkek', 'KGS', 'Кыргызстан', 'Asia', 'Central Asia', '🇰🇬', 'U+1F1F0 U+1F1EC', 1, 'Q813', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (119, 'Laos', 'LAO', 'LA', '856', 'Vientiane', 'LAK', 'ສປປລາວ', 'Asia', 'South-Eastern Asia', '🇱🇦', 'U+1F1F1 U+1F1E6', 1, 'Q819', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (120, 'Latvia', 'LVA', 'LV', '371', 'Riga', 'EUR', 'Latvija', 'Europe', 'Northern Europe', '🇱🇻', 'U+1F1F1 U+1F1FB', 1, 'Q211', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (121, 'Lebanon', 'LBN', 'LB', '961', 'Beirut', 'LBP', 'لبنان', 'Asia', 'Western Asia', '🇱🇧', 'U+1F1F1 U+1F1E7', 1, 'Q822', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (122, 'Lesotho', 'LSO', 'LS', '266', 'Maseru', 'LSL', 'Lesotho', 'Africa', 'Southern Africa', '🇱🇸', 'U+1F1F1 U+1F1F8', 1, 'Q1013', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (123, 'Liberia', 'LBR', 'LR', '231', 'Monrovia', 'LRD', 'Liberia', 'Africa', 'Western Africa', '🇱🇷', 'U+1F1F1 U+1F1F7', 1, 'Q1014', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (124, 'Libya', 'LBY', 'LY', '218', 'Tripolis', 'LYD', '‏ليبيا', 'Africa', 'Northern Africa', '🇱🇾', 'U+1F1F1 U+1F1FE', 1, 'Q1016', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (125, 'Liechtenstein', 'LIE', 'LI', '423', 'Vaduz', 'CHF', 'Liechtenstein', 'Europe', 'Western Europe', '🇱🇮', 'U+1F1F1 U+1F1EE', 1, 'Q347', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (126, 'Lithuania', 'LTU', 'LT', '370', 'Vilnius', 'EUR', 'Lietuva', 'Europe', 'Northern Europe', '🇱🇹', 'U+1F1F1 U+1F1F9', 1, 'Q37', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (127, 'Luxembourg', 'LUX', 'LU', '352', 'Luxembourg', 'EUR', 'Luxembourg', 'Europe', 'Western Europe', '🇱🇺', 'U+1F1F1 U+1F1FA', 1, 'Q32', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (128, 'Macau S.A.R.', 'MAC', 'MO', '853', 'Macao', 'MOP', '澳門', 'Asia', 'Eastern Asia', '🇲🇴', 'U+1F1F2 U+1F1F4', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (129, 'Macedonia', 'MKD', 'MK', '389', 'Skopje', 'MKD', 'Северна Македонија', 'Europe', 'Southern Europe', '🇲🇰', 'U+1F1F2 U+1F1F0', 1, 'Q221', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (130, 'Madagascar', 'MDG', 'MG', '261', 'Antananarivo', 'MGA', 'Madagasikara', 'Africa', 'Eastern Africa', '🇲🇬', 'U+1F1F2 U+1F1EC', 1, 'Q1019', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (131, 'Malawi', 'MWI', 'MW', '265', 'Lilongwe', 'MWK', 'Malawi', 'Africa', 'Eastern Africa', '🇲🇼', 'U+1F1F2 U+1F1FC', 1, 'Q1020', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (132, 'Malaysia', 'MYS', 'MY', '60', 'Kuala Lumpur', 'MYR', 'Malaysia', 'Asia', 'South-Eastern Asia', '🇲🇾', 'U+1F1F2 U+1F1FE', 1, 'Q833', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (133, 'Maldives', 'MDV', 'MV', '960', 'Male', 'MVR', 'Maldives', 'Asia', 'Southern Asia', '🇲🇻', 'U+1F1F2 U+1F1FB', 1, 'Q826', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (134, 'Mali', 'MLI', 'ML', '223', 'Bamako', 'XOF', 'Mali', 'Africa', 'Western Africa', '🇲🇱', 'U+1F1F2 U+1F1F1', 1, 'Q912', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (135, 'Malta', 'MLT', 'MT', '356', 'Valletta', 'EUR', 'Malta', 'Europe', 'Southern Europe', '🇲🇹', 'U+1F1F2 U+1F1F9', 1, 'Q233', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (136, 'Man (Isle of)', 'IMN', 'IM', '+44-1624', 'Douglas, Isle of Man', 'GBP', 'Isle of Man', 'Europe', 'Northern Europe', '🇮🇲', 'U+1F1EE U+1F1F2', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (137, 'Marshall Islands', 'MHL', 'MH', '692', 'Majuro', 'USD', 'M̧ajeļ', 'Oceania', 'Micronesia', '🇲🇭', 'U+1F1F2 U+1F1ED', 1, 'Q709', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (138, 'Martinique', 'MTQ', 'MQ', '596', 'Fort-de-France', 'EUR', 'Martinique', 'Americas', 'Caribbean', '🇲🇶', 'U+1F1F2 U+1F1F6', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (139, 'Mauritania', 'MRT', 'MR', '222', 'Nouakchott', 'MRO', 'موريتانيا', 'Africa', 'Western Africa', '🇲🇷', 'U+1F1F2 U+1F1F7', 1, 'Q1025', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (140, 'Mauritius', 'MUS', 'MU', '230', 'Port Louis', 'MUR', 'Maurice', 'Africa', 'Eastern Africa', '🇲🇺', 'U+1F1F2 U+1F1FA', 1, 'Q1027', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (141, 'Mayotte', 'MYT', 'YT', '262', 'Mamoudzou', 'EUR', 'Mayotte', 'Africa', 'Eastern Africa', '🇾🇹', 'U+1F1FE U+1F1F9', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (142, 'Mexico', 'MEX', 'MX', '52', 'Mexico City', 'MXN', 'México', 'Americas', 'Central America', '🇲🇽', 'U+1F1F2 U+1F1FD', 1, 'Q96', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (143, 'Micronesia', 'FSM', 'FM', '691', 'Palikir', 'USD', 'Micronesia', 'Oceania', 'Micronesia', '🇫🇲', 'U+1F1EB U+1F1F2', 1, 'Q702', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (144, 'Moldova', 'MDA', 'MD', '373', 'Chisinau', 'MDL', 'Moldova', 'Europe', 'Eastern Europe', '🇲🇩', 'U+1F1F2 U+1F1E9', 1, 'Q217', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (145, 'Monaco', 'MCO', 'MC', '377', 'Monaco', 'EUR', 'Monaco', 'Europe', 'Western Europe', '🇲🇨', 'U+1F1F2 U+1F1E8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (146, 'Mongolia', 'MNG', 'MN', '976', 'Ulan Bator', 'MNT', 'Монгол улс', 'Asia', 'Eastern Asia', '🇲🇳', 'U+1F1F2 U+1F1F3', 1, 'Q711', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (147, 'Montenegro', 'MNE', 'ME', '382', 'Podgorica', 'EUR', 'Црна Гора', 'Europe', 'Southern Europe', '🇲🇪', 'U+1F1F2 U+1F1EA', 1, 'Q236', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (148, 'Montserrat', 'MSR', 'MS', '+1-664', 'Plymouth', 'XCD', 'Montserrat', 'Americas', 'Caribbean', '🇲🇸', 'U+1F1F2 U+1F1F8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (149, 'Morocco', 'MAR', 'MA', '212', 'Rabat', 'MAD', 'المغرب', 'Africa', 'Northern Africa', '🇲🇦', 'U+1F1F2 U+1F1E6', 1, 'Q1028', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (150, 'Mozambique', 'MOZ', 'MZ', '258', 'Maputo', 'MZN', 'Moçambique', 'Africa', 'Eastern Africa', '🇲🇿', 'U+1F1F2 U+1F1FF', 1, 'Q1029', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (151, 'Myanmar', 'MMR', 'MM', '95', 'Nay Pyi Taw', 'MMK', 'မြန်မာ', 'Asia', 'South-Eastern Asia', '🇲🇲', 'U+1F1F2 U+1F1F2', 1, 'Q836', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (152, 'Namibia', 'NAM', 'NA', '264', 'Windhoek', 'NAD', 'Namibia', 'Africa', 'Southern Africa', '🇳🇦', 'U+1F1F3 U+1F1E6', 1, 'Q1030', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (153, 'Nauru', 'NRU', 'NR', '674', 'Yaren', 'AUD', 'Nauru', 'Oceania', 'Micronesia', '🇳🇷', 'U+1F1F3 U+1F1F7', 1, 'Q697', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (154, 'Nepal', 'NPL', 'NP', '977', 'Kathmandu', 'NPR', 'नपल', 'Asia', 'Southern Asia', '🇳🇵', 'U+1F1F3 U+1F1F5', 1, 'Q837', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (155, 'Netherlands Antilles', 'ANT', 'AN', '', '', '', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2018-07-20 20:11:03-05', '2018-07-20 20:11:03-05');
INSERT INTO public."Countries" VALUES (156, 'Netherlands The', 'NLD', 'NL', '31', 'Amsterdam', 'EUR', 'Nederland', 'Europe', 'Western Europe', '🇳🇱', 'U+1F1F3 U+1F1F1', 1, 'Q55', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (157, 'New Caledonia', 'NCL', 'NC', '687', 'Noumea', 'XPF', 'Nouvelle-Calédonie', 'Oceania', 'Melanesia', '🇳🇨', 'U+1F1F3 U+1F1E8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (158, 'New Zealand', 'NZL', 'NZ', '64', 'Wellington', 'NZD', 'New Zealand', 'Oceania', 'Australia and New Zealand', '🇳🇿', 'U+1F1F3 U+1F1FF', 1, 'Q664', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (159, 'Nicaragua', 'NIC', 'NI', '505', 'Managua', 'NIO', 'Nicaragua', 'Americas', 'Central America', '🇳🇮', 'U+1F1F3 U+1F1EE', 1, 'Q811', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (160, 'Niger', 'NER', 'NE', '227', 'Niamey', 'XOF', 'Niger', 'Africa', 'Western Africa', '🇳🇪', 'U+1F1F3 U+1F1EA', 1, 'Q1032', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (161, 'Nigeria', 'NGA', 'NG', '234', 'Abuja', 'NGN', 'Nigeria', 'Africa', 'Western Africa', '🇳🇬', 'U+1F1F3 U+1F1EC', 1, 'Q1033', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (162, 'Niue', 'NIU', 'NU', '683', 'Alofi', 'NZD', 'Niuē', 'Oceania', 'Polynesia', '🇳🇺', 'U+1F1F3 U+1F1FA', 1, 'Q34020', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (163, 'Norfolk Island', 'NFK', 'NF', '672', 'Kingston', 'AUD', 'Norfolk Island', 'Oceania', 'Australia and New Zealand', '🇳🇫', 'U+1F1F3 U+1F1EB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (164, 'Northern Mariana Islands', 'MNP', 'MP', '+1-670', 'Saipan', 'USD', 'Northern Mariana Islands', 'Oceania', 'Micronesia', '🇲🇵', 'U+1F1F2 U+1F1F5', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (165, 'Norway', 'NOR', 'NO', '47', 'Oslo', 'NOK', 'Norge', 'Europe', 'Northern Europe', '🇳🇴', 'U+1F1F3 U+1F1F4', 1, 'Q20', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (166, 'Oman', 'OMN', 'OM', '968', 'Muscat', 'OMR', 'عمان', 'Asia', 'Western Asia', '🇴🇲', 'U+1F1F4 U+1F1F2', 1, 'Q842', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (167, 'Pakistan', 'PAK', 'PK', '92', 'Islamabad', 'PKR', 'Pakistan', 'Asia', 'Southern Asia', '🇵🇰', 'U+1F1F5 U+1F1F0', 1, 'Q843', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (168, 'Palau', 'PLW', 'PW', '680', 'Melekeok', 'USD', 'Palau', 'Oceania', 'Micronesia', '🇵🇼', 'U+1F1F5 U+1F1FC', 1, 'Q695', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (169, 'Palestinian Territory Occupied', 'PSE', 'PS', '970', 'East Jerusalem', 'ILS', 'فلسطين', 'Asia', 'Western Asia', '🇵🇸', 'U+1F1F5 U+1F1F8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (170, 'Panama', 'PAN', 'PA', '507', 'Panama City', 'PAB', 'Panamá', 'Americas', 'Central America', '🇵🇦', 'U+1F1F5 U+1F1E6', 1, 'Q804', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (171, 'Papua new Guinea', 'PNG', 'PG', '675', 'Port Moresby', 'PGK', 'Papua Niugini', 'Oceania', 'Melanesia', '🇵🇬', 'U+1F1F5 U+1F1EC', 1, 'Q691', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (172, 'Paraguay', 'PRY', 'PY', '595', 'Asuncion', 'PYG', 'Paraguay', 'Americas', 'South America', '🇵🇾', 'U+1F1F5 U+1F1FE', 1, 'Q733', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (173, 'Peru', 'PER', 'PE', '51', 'Lima', 'PEN', 'Perú', 'Americas', 'South America', '🇵🇪', 'U+1F1F5 U+1F1EA', 1, 'Q419', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (174, 'Philippines', 'PHL', 'PH', '63', 'Manila', 'PHP', 'Pilipinas', 'Asia', 'South-Eastern Asia', '🇵🇭', 'U+1F1F5 U+1F1ED', 1, 'Q928', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (175, 'Pitcairn Island', 'PCN', 'PN', '870', 'Adamstown', 'NZD', 'Pitcairn Islands', 'Oceania', 'Polynesia', '🇵🇳', 'U+1F1F5 U+1F1F3', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (176, 'Poland', 'POL', 'PL', '48', 'Warsaw', 'PLN', 'Polska', 'Europe', 'Eastern Europe', '🇵🇱', 'U+1F1F5 U+1F1F1', 1, 'Q36', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (177, 'Portugal', 'PRT', 'PT', '351', 'Lisbon', 'EUR', 'Portugal', 'Europe', 'Southern Europe', '🇵🇹', 'U+1F1F5 U+1F1F9', 1, 'Q45', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (178, 'Puerto Rico', 'PRI', 'PR', '+1-787 and 1-939', 'San Juan', 'USD', 'Puerto Rico', 'Americas', 'Caribbean', '🇵🇷', 'U+1F1F5 U+1F1F7', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (179, 'Qatar', 'QAT', 'QA', '974', 'Doha', 'QAR', 'قطر', 'Asia', 'Western Asia', '🇶🇦', 'U+1F1F6 U+1F1E6', 1, 'Q846', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (180, 'Reunion', 'REU', 'RE', '262', 'Saint-Denis', 'EUR', 'La Réunion', 'Africa', 'Eastern Africa', '🇷🇪', 'U+1F1F7 U+1F1EA', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (181, 'Romania', 'ROU', 'RO', '40', 'Bucharest', 'RON', 'România', 'Europe', 'Eastern Europe', '🇷🇴', 'U+1F1F7 U+1F1F4', 1, 'Q218', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (182, 'Russia', 'RUS', 'RU', '7', 'Moscow', 'RUB', 'Россия', 'Europe', 'Eastern Europe', '🇷🇺', 'U+1F1F7 U+1F1FA', 1, 'Q159', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (183, 'Rwanda', 'RWA', 'RW', '250', 'Kigali', 'RWF', 'Rwanda', 'Africa', 'Eastern Africa', '🇷🇼', 'U+1F1F7 U+1F1FC', 1, 'Q1037', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (184, 'Saint Helena', 'SHN', 'SH', '290', 'Jamestown', 'SHP', 'Saint Helena', 'Africa', 'Western Africa', '🇸🇭', 'U+1F1F8 U+1F1ED', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (185, 'Saint Kitts And Nevis', 'KNA', 'KN', '+1-869', 'Basseterre', 'XCD', 'Saint Kitts and Nevis', 'Americas', 'Caribbean', '🇰🇳', 'U+1F1F0 U+1F1F3', 1, 'Q763', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (186, 'Saint Lucia', 'LCA', 'LC', '+1-758', 'Castries', 'XCD', 'Saint Lucia', 'Americas', 'Caribbean', '🇱🇨', 'U+1F1F1 U+1F1E8', 1, 'Q760', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (187, 'Saint Pierre and Miquelon', 'SPM', 'PM', '508', 'Saint-Pierre', 'EUR', 'Saint-Pierre-et-Miquelon', 'Americas', 'Northern America', '🇵🇲', 'U+1F1F5 U+1F1F2', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (188, 'Saint Vincent And The Grenadines', 'VCT', 'VC', '+1-784', 'Kingstown', 'XCD', 'Saint Vincent and the Grenadines', 'Americas', 'Caribbean', '🇻🇨', 'U+1F1FB U+1F1E8', 1, 'Q757', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (189, 'Saint-Barthelemy', 'BLM', 'BL', '590', 'Gustavia', 'EUR', 'Saint-Barthélemy', 'Americas', 'Caribbean', '🇧🇱', 'U+1F1E7 U+1F1F1', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (190, 'Saint-Martin (French part)', 'MAF', 'MF', '590', 'Marigot', 'EUR', 'Saint-Martin', 'Americas', 'Caribbean', '🇲🇫', 'U+1F1F2 U+1F1EB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (191, 'Samoa', 'WSM', 'WS', '685', 'Apia', 'WST', 'Samoa', 'Oceania', 'Polynesia', '🇼🇸', 'U+1F1FC U+1F1F8', 1, 'Q683', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (192, 'San Marino', 'SMR', 'SM', '378', 'San Marino', 'EUR', 'San Marino', 'Europe', 'Southern Europe', '🇸🇲', 'U+1F1F8 U+1F1F2', 1, 'Q238', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (193, 'Sao Tome and Principe', 'STP', 'ST', '239', 'Sao Tome', 'STD', 'São Tomé e Príncipe', 'Africa', 'Middle Africa', '🇸🇹', 'U+1F1F8 U+1F1F9', 1, 'Q1039', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (194, 'Saudi Arabia', 'SAU', 'SA', '966', 'Riyadh', 'SAR', 'العربية السعودية', 'Asia', 'Western Asia', '🇸🇦', 'U+1F1F8 U+1F1E6', 1, 'Q851', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (195, 'Senegal', 'SEN', 'SN', '221', 'Dakar', 'XOF', 'Sénégal', 'Africa', 'Western Africa', '🇸🇳', 'U+1F1F8 U+1F1F3', 1, 'Q1041', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (196, 'Serbia', 'SRB', 'RS', '381', 'Belgrade', 'RSD', 'Србија', 'Europe', 'Southern Europe', '🇷🇸', 'U+1F1F7 U+1F1F8', 1, 'Q403', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (197, 'Seychelles', 'SYC', 'SC', '248', 'Victoria', 'SCR', 'Seychelles', 'Africa', 'Eastern Africa', '🇸🇨', 'U+1F1F8 U+1F1E8', 1, 'Q1042', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (198, 'Sierra Leone', 'SLE', 'SL', '232', 'Freetown', 'SLL', 'Sierra Leone', 'Africa', 'Western Africa', '🇸🇱', 'U+1F1F8 U+1F1F1', 1, 'Q1044', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (199, 'Singapore', 'SGP', 'SG', '65', 'Singapur', 'SGD', 'Singapore', 'Asia', 'South-Eastern Asia', '🇸🇬', 'U+1F1F8 U+1F1EC', 1, 'Q334', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (200, 'Slovakia', 'SVK', 'SK', '421', 'Bratislava', 'EUR', 'Slovensko', 'Europe', 'Eastern Europe', '🇸🇰', 'U+1F1F8 U+1F1F0', 1, 'Q214', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (201, 'Slovenia', 'SVN', 'SI', '386', 'Ljubljana', 'EUR', 'Slovenija', 'Europe', 'Southern Europe', '🇸🇮', 'U+1F1F8 U+1F1EE', 1, 'Q215', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (202, 'Solomon Islands', 'SLB', 'SB', '677', 'Honiara', 'SBD', 'Solomon Islands', 'Oceania', 'Melanesia', '🇸🇧', 'U+1F1F8 U+1F1E7', 1, 'Q685', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (203, 'Somalia', 'SOM', 'SO', '252', 'Mogadishu', 'SOS', 'Soomaaliya', 'Africa', 'Eastern Africa', '🇸🇴', 'U+1F1F8 U+1F1F4', 1, 'Q1045', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (204, 'South Africa', 'ZAF', 'ZA', '27', 'Pretoria', 'ZAR', 'South Africa', 'Africa', 'Southern Africa', '🇿🇦', 'U+1F1FF U+1F1E6', 1, 'Q258', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (205, 'South Georgia', 'SGS', 'GS', '', 'Grytviken', 'GBP', 'South Georgia', 'Americas', 'South America', '🇬🇸', 'U+1F1EC U+1F1F8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (206, 'South Sudan', 'SSD', 'SS', '211', 'Juba', 'SSP', 'South Sudan', 'Africa', 'Middle Africa', '🇸🇸', 'U+1F1F8 U+1F1F8', 1, 'Q958', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (207, 'Spain', 'ESP', 'ES', '34', 'Madrid', 'EUR', 'España', 'Europe', 'Southern Europe', '🇪🇸', 'U+1F1EA U+1F1F8', 1, 'Q29', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (208, 'Sri Lanka', 'LKA', 'LK', '94', 'Colombo', 'LKR', 'śrī laṃkāva', 'Asia', 'Southern Asia', '🇱🇰', 'U+1F1F1 U+1F1F0', 1, 'Q854', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (209, 'Sudan', 'SDN', 'SD', '249', 'Khartoum', 'SDG', 'السودان', 'Africa', 'Northern Africa', '🇸🇩', 'U+1F1F8 U+1F1E9', 1, 'Q1049', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (210, 'Suriname', 'SUR', 'SR', '597', 'Paramaribo', 'SRD', 'Suriname', 'Americas', 'South America', '🇸🇷', 'U+1F1F8 U+1F1F7', 1, 'Q730', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (211, 'Svalbard And Jan Mayen Islands', 'SJM', 'SJ', '47', 'Longyearbyen', 'NOK', 'Svalbard og Jan Mayen', 'Europe', 'Northern Europe', '🇸🇯', 'U+1F1F8 U+1F1EF', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (212, 'Swaziland', 'SWZ', 'SZ', '268', 'Mbabane', 'SZL', 'Swaziland', 'Africa', 'Southern Africa', '🇸🇿', 'U+1F1F8 U+1F1FF', 1, 'Q1050', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (213, 'Sweden', 'SWE', 'SE', '46', 'Stockholm', 'SEK', 'Sverige', 'Europe', 'Northern Europe', '🇸🇪', 'U+1F1F8 U+1F1EA', 1, 'Q34', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (214, 'Switzerland', 'CHE', 'CH', '41', 'Berne', 'CHF', 'Schweiz', 'Europe', 'Western Europe', '🇨🇭', 'U+1F1E8 U+1F1ED', 1, 'Q39', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (215, 'Syria', 'SYR', 'SY', '963', 'Damascus', 'SYP', 'سوريا', 'Asia', 'Western Asia', '🇸🇾', 'U+1F1F8 U+1F1FE', 1, 'Q858', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (216, 'Taiwan', 'TWN', 'TW', '886', 'Taipei', 'TWD', '臺灣', 'Asia', 'Eastern Asia', '🇹🇼', 'U+1F1F9 U+1F1FC', 1, 'Q865', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (217, 'Tajikistan', 'TJK', 'TJ', '992', 'Dushanbe', 'TJS', 'Тоҷикистон', 'Asia', 'Central Asia', '🇹🇯', 'U+1F1F9 U+1F1EF', 1, 'Q863', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (218, 'Tanzania', 'TZA', 'TZ', '255', 'Dodoma', 'TZS', 'Tanzania', 'Africa', 'Eastern Africa', '🇹🇿', 'U+1F1F9 U+1F1FF', 1, 'Q924', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (219, 'Thailand', 'THA', 'TH', '66', 'Bangkok', 'THB', 'ประเทศไทย', 'Asia', 'South-Eastern Asia', '🇹🇭', 'U+1F1F9 U+1F1ED', 1, 'Q869', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (220, 'Togo', 'TGO', 'TG', '228', 'Lome', 'XOF', 'Togo', 'Africa', 'Western Africa', '🇹🇬', 'U+1F1F9 U+1F1EC', 1, 'Q945', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (221, 'Tokelau', 'TKL', 'TK', '690', '', 'NZD', 'Tokelau', 'Oceania', 'Polynesia', '🇹🇰', 'U+1F1F9 U+1F1F0', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (222, 'Tonga', 'TON', 'TO', '676', 'Nukualofa', 'TOP', 'Tonga', 'Oceania', 'Polynesia', '🇹🇴', 'U+1F1F9 U+1F1F4', 1, 'Q678', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (223, 'Trinidad And Tobago', 'TTO', 'TT', '+1-868', 'Port of Spain', 'TTD', 'Trinidad and Tobago', 'Americas', 'Caribbean', '🇹🇹', 'U+1F1F9 U+1F1F9', 1, 'Q754', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (224, 'Tunisia', 'TUN', 'TN', '216', 'Tunis', 'TND', 'تونس', 'Africa', 'Northern Africa', '🇹🇳', 'U+1F1F9 U+1F1F3', 1, 'Q948', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (225, 'Turkey', 'TUR', 'TR', '90', 'Ankara', 'TRY', 'Türkiye', 'Asia', 'Western Asia', '🇹🇷', 'U+1F1F9 U+1F1F7', 1, 'Q43', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (226, 'Turkmenistan', 'TKM', 'TM', '993', 'Ashgabat', 'TMT', 'Türkmenistan', 'Asia', 'Central Asia', '🇹🇲', 'U+1F1F9 U+1F1F2', 1, 'Q874', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (227, 'Turks And Caicos Islands', 'TCA', 'TC', '+1-649', 'Cockburn Town', 'USD', 'Turks and Caicos Islands', 'Americas', 'Caribbean', '🇹🇨', 'U+1F1F9 U+1F1E8', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (228, 'Tuvalu', 'TUV', 'TV', '688', 'Funafuti', 'AUD', 'Tuvalu', 'Oceania', 'Polynesia', '🇹🇻', 'U+1F1F9 U+1F1FB', 1, 'Q672', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (229, 'Uganda', 'UGA', 'UG', '256', 'Kampala', 'UGX', 'Uganda', 'Africa', 'Eastern Africa', '🇺🇬', 'U+1F1FA U+1F1EC', 1, 'Q1036', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (230, 'Ukraine', 'UKR', 'UA', '380', 'Kiev', 'UAH', 'Україна', 'Europe', 'Eastern Europe', '🇺🇦', 'U+1F1FA U+1F1E6', 1, 'Q212', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (231, 'United Arab Emirates', 'ARE', 'AE', '971', 'Abu Dhabi', 'AED', 'دولة الإمارات العربية المتحدة', 'Asia', 'Western Asia', '🇦🇪', 'U+1F1E6 U+1F1EA', 1, 'Q878', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (232, 'United Kingdom', 'GBR', 'GB', '44', 'London', 'GBP', 'United Kingdom', 'Europe', 'Northern Europe', '🇬🇧', 'U+1F1EC U+1F1E7', 1, 'Q145', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (233, 'United States', 'USA', 'US', '1', 'Washington', 'USD', 'United States', 'Americas', 'Northern America', '🇺🇸', 'U+1F1FA U+1F1F8', 1, 'Q30', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (234, 'United States Minor Outlying Islands', 'UMI', 'UM', '1', '', 'USD', 'United States Minor Outlying Islands', 'Americas', 'Northern America', '🇺🇲', 'U+1F1FA U+1F1F2', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (235, 'Uruguay', 'URY', 'UY', '598', 'Montevideo', 'UYU', 'Uruguay', 'Americas', 'South America', '🇺🇾', 'U+1F1FA U+1F1FE', 1, 'Q77', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (236, 'Uzbekistan', 'UZB', 'UZ', '998', 'Tashkent', 'UZS', 'O‘zbekiston', 'Asia', 'Central Asia', '🇺🇿', 'U+1F1FA U+1F1FF', 1, 'Q265', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (237, 'Vanuatu', 'VUT', 'VU', '678', 'Port Vila', 'VUV', 'Vanuatu', 'Oceania', 'Melanesia', '🇻🇺', 'U+1F1FB U+1F1FA', 1, 'Q686', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (238, 'Vatican City State (Holy See)', 'VAT', 'VA', '379', 'Vatican City', 'EUR', 'Vaticano', 'Europe', 'Southern Europe', '🇻🇦', 'U+1F1FB U+1F1E6', 1, 'Q237', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (239, 'Venezuela', 'VEN', 'VE', '58', 'Caracas', 'VEF', 'Venezuela', 'Americas', 'South America', '🇻🇪', 'U+1F1FB U+1F1EA', 1, 'Q717', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (240, 'Vietnam', 'VNM', 'VN', '84', 'Hanoi', 'VND', 'Việt Nam', 'Asia', 'South-Eastern Asia', '🇻🇳', 'U+1F1FB U+1F1F3', 1, 'Q881', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (241, 'Virgin Islands (British)', 'VGB', 'VG', '+1-284', 'Road Town', 'USD', 'British Virgin Islands', 'Americas', 'Caribbean', '🇻🇬', 'U+1F1FB U+1F1EC', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (242, 'Virgin Islands (US)', 'VIR', 'VI', '+1-340', 'Charlotte Amalie', 'USD', 'United States Virgin Islands', 'Americas', 'Caribbean', '🇻🇮', 'U+1F1FB U+1F1EE', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (243, 'Wallis And Futuna Islands', 'WLF', 'WF', '681', 'Mata Utu', 'XPF', 'Wallis et Futuna', 'Oceania', 'Polynesia', '🇼🇫', 'U+1F1FC U+1F1EB', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (244, 'Western Sahara', 'ESH', 'EH', '212', 'El-Aaiun', 'MAD', 'الصحراء الغربية', 'Africa', 'Northern Africa', '🇪🇭', 'U+1F1EA U+1F1ED', 1, NULL, '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (245, 'Yemen', 'YEM', 'YE', '967', 'Sanaa', 'YER', 'اليَمَن', 'Asia', 'Western Asia', '🇾🇪', 'U+1F1FE U+1F1EA', 1, 'Q805', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (246, 'Zambia', 'ZMB', 'ZM', '260', 'Lusaka', 'ZMW', 'Zambia', 'Africa', 'Eastern Africa', '🇿🇲', 'U+1F1FF U+1F1F2', 1, 'Q953', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (247, 'Zimbabwe', 'ZWE', 'ZW', '263', 'Harare', 'ZWL', 'Zimbabwe', 'Africa', 'Eastern Africa', '🇿🇼', 'U+1F1FF U+1F1FC', 1, 'Q954', '2018-07-20 20:11:03-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (248, 'Kosovo', 'XKX', 'XK', '383', 'Pristina', 'EUR', 'Republika e Kosovës', 'Europe', 'Eastern Europe', '🇽🇰', 'U+1F1FD U+1F1F0', 1, 'Q1246', '2020-08-15 15:33:50-05', '2020-10-25 14:35:15-05');
INSERT INTO public."Countries" VALUES (249, 'Curaçao', 'CUW', 'CW', '599', 'Willemstad', 'ANG', 'Curaçao', 'Americas', 'Caribbean', '🇨🇼', 'U+1F1E8 U+1F1FC', 1, 'Q25279', '2020-10-25 14:54:20-05', '2020-10-25 14:54:32-05');


--
-- Name: Countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Countries_id_seq"', 250, false);


--
-- Name: Countries Countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Countries"
    ADD CONSTRAINT "Countries_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

