--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

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

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favorites_id_seq OWNER TO postgres;

--
-- Name: favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_id_seq OWNED BY public.favorites.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    CONSTRAINT order_items_price_check CHECK ((price >= (0)::numeric)),
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT orders_total_amount_check CHECK ((total_amount >= (0)::numeric))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    image_url character varying(255),
    category_id integer NOT NULL,
    CONSTRAINT products_precio_check CHECK ((precio > (0)::numeric))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    nro_documento character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    rol_administrador boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: favorites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN id SET DEFAULT nextval('public.favorites_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
1	Electrodom├®sticos
2	Cocina
3	Muebles
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, user_id, product_id) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, price) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total_amount, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, nombre, descripcion, precio, image_url, category_id) FROM stdin;
1	Refrigerador No Frost	Refrigerador de doble puerta con sistema No Frost y ahorro energ├®tico.	450000.00	https://media.istockphoto.com/id/1314423803/es/vector/nevera-realista-con-juego-de-puertas-dobles-moderno-electrodom%C3%A9stico-de-dos-c%C3%A1maras.jpg?s=612x612&w=0&k=20&c=djzRzKO8F2X9F7t8R3sl7lGIIofSdegjQSWcuxkMkNs=	1
2	Lavadora autom├ítica 12kg	Lavadora con m├║ltiples programas y bajo consumo de agua.	320000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4928348%2F1363445-0000-004.jpg%3Fv%3D638863608676270000&w=128&q=75	1
3	Microondas digital 25L	Microondas con pantalla t├íctil y 10 niveles de potencia.	98000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4837837%2F1272682-0000-001.jpg%3Fv%3D638733541075500000&w=128&q=75	1
4	Horno el├®ctrico 45L	Horno el├®ctrico con control de temperatura y temporizador.	120000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4837188%2F1275312-0000-001.jpg%3Fv%3D638837040962800000&w=128&q=75	1
5	Aspiradora inal├ímbrica	Aspiradora liviana con bater├¡a recargable y filtro HEPA.	87000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5139534%2F1442082-0000-008.jpg%3Fv%3D638918433873000000&w=128&q=75	1
6	Licuadora de alta potencia	Licuadora profesional para batidos, jugos y salsas.	65000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5078845%2F1282135-0001-001.jpg%3Fv%3D638863577193530000&w=128&q=75	1
7	Cafetera espresso	Cafetera autom├ítica con vaporizador de leche.	110000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5062401%2F1332727-0000-001.jpg%3Fv%3D638863595932630000&w=128&q=75	1
8	Set de ollas de acero inoxidable	Juego de 5 piezas con tapas de vidrio templado.	95000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F3737137%2F1409329-0000-001.jpg%3Fv%3D638719072971130000&w=128&q=75	2
9	Sart├®n antiadherente 28cm	Sart├®n de aluminio con recubrimiento cer├ímico.	38000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4360933%2F1339425-0000-001.jpg%3Fv%3D638728528140430000&w=128&q=75	2
10	Juego de cuchillos profesionales	Set de 6 cuchillos con mango ergon├│mico.	56000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4853120%2F1391016-0000-001.jpg%3Fv%3D638733573703570000&w=128&q=75	2
11	Tabla de cortar bamb├║	Tabla ecol├│gica y resistente, ideal para cocina diaria.	18000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4853519%2F1391036-0000-001.jpg%3Fv%3D638733573899370000&w=128&q=75	2
12	Tostadora doble ranura	Tostadora el├®ctrica con 6 niveles de dorado.	45000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5066091%2F1421581-0000-002.jpg%3Fv%3D638863633561600000&w=128&q=75	2
13	Exprimidor el├®ctrico	Exprimidor de c├¡tricos con filtro para pulpa.	39000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5085656%2F1406562-0000-001.jpg%3Fv%3D638863630792830000&w=128&q=75	2
14	Juego de vasos de vidrio 6 unidades	Vasos de alta resistencia y dise├▒o elegante.	25000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F3726581%2F1335534-0000-001.jpg%3Fv%3D638863596497430000&w=128&q=75	2
15	Sof├í modular 3 cuerpos	Sof├í tapizado en lino gris con cojines extra├¡bles.	310000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4951760%2F1428224-0000-001.jpg%3Fv%3D638863637858530000&w=128&q=75	3
16	Mesa de comedor extensible	Mesa de madera maciza con extensi├│n para 8 personas.	280000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4985451%2F1141770-0200-001.jpg%3Fv%3D638863541334030000&w=128&q=75	3
17	Silla de comedor tapizada	Silla con patas de madera y respaldo ergon├│mico.	45000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5000700%2F1308260-0000-003.jpg%3Fv%3D638878851660000000&w=128&q=75	3
18	Estante de pared flotante	Estante de madera con soportes ocultos.	36000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F4951168%2F1421651-0000-001.jpg%3Fv%3D638739771736070000&w=128&q=75	3
19	Velador n├│rdico	Mesa de noche con caj├│n y patas de roble.	52000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5084874%2F1390576-0000-001.jpg%3Fv%3D638744082938630000&w=128&q=75	3
20	Rack para TV 65"	Mueble para televisor con compartimientos abiertos.	97000.00	https://www.easy.cl/_next/image?url=https%3A%2F%2Feasycl.vteximg.com.br%2Farquivos%2Fids%2F5082861%2F1351236-0000-002.jpg%3Fv%3D638863598404170000&w=128&q=75	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, nombre, nro_documento, email, password, direccion, rol_administrador) FROM stdin;
1	Usuario Uno	11111111-1	correo1@correo.com	$2a$06$2rmN7zFdxGtUdhzM7y43mu867jzkCdedIrltlIhy3kG5QNChRZDWy	Av. Siempre Viva 1	t
2	Usuario Dos	22222222-2	correo2@correo.com	$2a$06$s/FVnqNAop.pkXaaLl7BNe1dy7NzndhqRjXP7QhDzgapJT26GuB9C	Av. Siempre Viva 2	f
3	Usuario Tres	33333333-3	correo3@correo.com	$2a$06$6u7LmPNNkG.CYrpLwKi3.ebpMGW8Lp7Z3Y9flkf0FKK93nl5QqcgO	Av. Siempre Viva 3	f
4	Usuario Cuatro	44444444-4	correo4@correo.com	$2a$06$u0PDEZj69OVckfDUULpeqedzHvWFn1cX9nvHOybUex2HTngjfYBiO	Av. Siempre Viva 4	f
5	Usuario Cinco	55555555-5	correo5@correo.com	$2a$06$HwhDsDG0HXFqjIrr8RQ.bOluvAsJjEzDgPoE6IYymfVOI1WUIfLKW	Av. Siempre Viva 5	f
6	Miguel Sanchez	257901580	miguels715@gmail.com	$2b$10$9YPjRoluyJ.cG2oR6Cc6p.jH94f4bL2jWkVnv979g5my3OT5T.IUO	Av Maria 6415	f
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- Name: favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_id_seq', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 20, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: favorites unique_user_product_favorite; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT unique_user_product_favorite UNIQUE (user_id, product_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_nro_documento_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nro_documento_key UNIQUE (nro_documento);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorites fk_favorite_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk_favorite_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: favorites fk_favorite_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_item_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items fk_order_item_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders fk_order_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: products fk_product_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

