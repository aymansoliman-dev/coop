--
-- PostgreSQL database dump
--

\restrict 7otcg37hbmlUdzAGFQuHIdhST9FVhzpzEnBd3z75qOXdhJ0PpRTeB8QoNyed2gT

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: collaborator_rule; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.collaborator_rule AS ENUM (
    'owner',
    'collaborator'
);


ALTER TYPE public.collaborator_rule OWNER TO postgres;

--
-- Name: history_event; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.history_event AS ENUM (
    'task_completed',
    'project_collaborated',
    'rating_received',
    'other'
);


ALTER TYPE public.history_event OWNER TO postgres;

--
-- Name: project_asset; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.project_asset AS ENUM (
    'repository',
    'deployment',
    'design',
    'documentation',
    'board',
    'other'
);


ALTER TYPE public.project_asset OWNER TO postgres;

--
-- Name: request_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.request_status AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE public.request_status OWNER TO postgres;

--
-- Name: social_platform; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.social_platform AS ENUM (
    'gitHub',
    'linkedIn',
    'blueSky',
    'portfolio',
    'x',
    'medium'
);


ALTER TYPE public.social_platform OWNER TO postgres;

--
-- Name: task_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_category AS ENUM (
    'Frontend',
    'UI/UX',
    'Backend',
    'DevOps',
    'Design',
    'CI/CD',
    'other',
    'Security'
);


ALTER TYPE public.task_category OWNER TO postgres;

--
-- Name: task_priority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_priority AS ENUM (
    'low',
    'medium',
    'high'
);


ALTER TYPE public.task_priority OWNER TO postgres;

--
-- Name: task_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status AS ENUM (
    'backlog',
    'pending',
    'in progress',
    'done',
    'in review'
);


ALTER TYPE public.task_status OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'Project Manager',
    'UI/UX',
    'Frontend',
    'Backend',
    'Security',
    'Fullstack',
    'Designer',
    'DevOps',
    'QA',
    'other'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: collaboration_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collaboration_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    actor_id uuid NOT NULL,
    target_id uuid NOT NULL,
    status public.request_status DEFAULT 'pending'::public.request_status NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.collaboration_requests OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message text NOT NULL,
    author uuid,
    task uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    message text NOT NULL,
    actor uuid,
    receiver uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: project_assets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_assets (
    project_id uuid NOT NULL,
    asset public.project_asset NOT NULL,
    url text NOT NULL
);


ALTER TABLE public.project_assets OWNER TO postgres;

--
-- Name: project_stars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_stars (
    project_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.project_stars OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    owner_id uuid NOT NULL,
    project_statement text,
    private boolean NOT NULL,
    logo text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    theme character varying(9) NOT NULL
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_collaborators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects_collaborators (
    project_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role public.collaborator_rule DEFAULT 'collaborator'::public.collaborator_rule NOT NULL
);


ALTER TABLE public.projects_collaborators OWNER TO postgres;

--
-- Name: projects_stacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects_stacks (
    project_id uuid NOT NULL,
    stack_id uuid NOT NULL
);


ALTER TABLE public.projects_stacks OWNER TO postgres;

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    rater_id uuid NOT NULL,
    ratee_id uuid NOT NULL,
    project_id uuid NOT NULL,
    rate numeric(2,1) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT ratings_rate_check CHECK (((rate >= 0.0) AND (rate <= 9.9)))
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: stacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stacks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(64) NOT NULL
);


ALTER TABLE public.stacks OWNER TO postgres;

--
-- Name: task_assignment_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_assignment_requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    task_id uuid NOT NULL,
    actor_id uuid NOT NULL,
    target_id uuid NOT NULL,
    status public.request_status DEFAULT 'pending'::public.request_status NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.task_assignment_requests OWNER TO postgres;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    priority public.task_priority DEFAULT 'low'::public.task_priority NOT NULL,
    status public.task_status DEFAULT 'backlog'::public.task_status NOT NULL,
    category public.task_category,
    due_date timestamp without time zone,
    project_id uuid NOT NULL,
    assignee uuid,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_stacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks_stacks (
    task_id uuid NOT NULL,
    stack_id uuid NOT NULL
);


ALTER TABLE public.tasks_stacks OWNER TO postgres;

--
-- Name: user_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    actor_id uuid,
    project_id uuid,
    task_id uuid,
    event_type public.history_event NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_history OWNER TO postgres;

--
-- Name: user_social_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_social_links (
    user_id uuid NOT NULL,
    platform public.social_platform NOT NULL,
    url text NOT NULL
);


ALTER TABLE public.user_social_links OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    username character varying(64) NOT NULL,
    email text NOT NULL,
    password_hash character varying(255) NOT NULL,
    role public.user_role NOT NULL,
    country text,
    avatar text,
    bio character varying(256),
    score integer DEFAULT 0 NOT NULL,
    private boolean NOT NULL,
    private_id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    profile_theme character varying(9) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_stacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_stacks (
    user_id uuid NOT NULL,
    stack_id uuid NOT NULL
);


ALTER TABLE public.users_stacks OWNER TO postgres;

--
-- Name: collaboration_requests collaboration_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaboration_requests
    ADD CONSTRAINT collaboration_requests_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: project_assets project_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_assets
    ADD CONSTRAINT project_assets_pkey PRIMARY KEY (project_id, asset);


--
-- Name: project_stars project_stars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_stars
    ADD CONSTRAINT project_stars_pkey PRIMARY KEY (project_id, user_id);


--
-- Name: projects_collaborators projects_collaborators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects_collaborators
    ADD CONSTRAINT projects_collaborators_pkey PRIMARY KEY (project_id, user_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects_stacks projects_stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects_stacks
    ADD CONSTRAINT projects_stacks_pkey PRIMARY KEY (project_id, stack_id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (rater_id, ratee_id, project_id);


--
-- Name: stacks stacks_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stacks
    ADD CONSTRAINT stacks_name_key UNIQUE (name);


--
-- Name: stacks stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stacks
    ADD CONSTRAINT stacks_pkey PRIMARY KEY (id);


--
-- Name: task_assignment_requests task_assignment_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignment_requests
    ADD CONSTRAINT task_assignment_requests_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: tasks_stacks tasks_stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks_stacks
    ADD CONSTRAINT tasks_stacks_pkey PRIMARY KEY (task_id, stack_id);


--
-- Name: user_history user_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT user_history_pkey PRIMARY KEY (id);


--
-- Name: user_social_links user_social_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_social_links
    ADD CONSTRAINT user_social_links_pkey PRIMARY KEY (user_id, platform);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_private_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_private_id_key UNIQUE (private_id);


--
-- Name: users_stacks users_stacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_stacks
    ADD CONSTRAINT users_stacks_pkey PRIMARY KEY (user_id, stack_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: unique_pending_request; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_pending_request ON public.collaboration_requests USING btree (project_id, actor_id, target_id) WHERE (status = 'pending'::public.request_status);


--
-- Name: unique_pending_task_request; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_pending_task_request ON public.task_assignment_requests USING btree (task_id, actor_id, target_id) WHERE (status = 'pending'::public.request_status);


--
-- Name: collaboration_requests collaboration_requests_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaboration_requests
    ADD CONSTRAINT collaboration_requests_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: collaboration_requests collaboration_requests_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaboration_requests
    ADD CONSTRAINT collaboration_requests_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: collaboration_requests collaboration_requests_target_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaboration_requests
    ADD CONSTRAINT collaboration_requests_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments comments_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_fkey FOREIGN KEY (author) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: comments comments_task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_task_fkey FOREIGN KEY (task) REFERENCES public.tasks(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_actor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_actor_fkey FOREIGN KEY (actor) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: notifications notifications_receiver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_receiver_fkey FOREIGN KEY (receiver) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: project_assets project_assets_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_assets
    ADD CONSTRAINT project_assets_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_stars project_stars_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_stars
    ADD CONSTRAINT project_stars_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_stars project_stars_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_stars
    ADD CONSTRAINT project_stars_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects_collaborators projects_collaborators_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects_collaborators
    ADD CONSTRAINT projects_collaborators_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;


--
-- Name: projects_collaborators projects_collaborators_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects_collaborators
    ADD CONSTRAINT projects_collaborators_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects projects_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: projects_stacks projects_stacks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects_stacks
    ADD CONSTRAINT projects_stacks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: projects_stacks projects_stacks_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects_stacks
    ADD CONSTRAINT projects_stacks_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES public.stacks(id) ON DELETE CASCADE;


--
-- Name: ratings ratings_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;


--
-- Name: ratings ratings_ratee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_ratee_id_fkey FOREIGN KEY (ratee_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: ratings ratings_rater_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_rater_id_fkey FOREIGN KEY (rater_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: task_assignment_requests task_assignment_requests_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignment_requests
    ADD CONSTRAINT task_assignment_requests_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: task_assignment_requests task_assignment_requests_target_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignment_requests
    ADD CONSTRAINT task_assignment_requests_target_id_fkey FOREIGN KEY (target_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: task_assignment_requests task_assignment_requests_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignment_requests
    ADD CONSTRAINT task_assignment_requests_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE CASCADE;


--
-- Name: tasks tasks_assignee_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assignee_fkey FOREIGN KEY (assignee) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: tasks tasks_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: tasks_stacks tasks_stacks_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks_stacks
    ADD CONSTRAINT tasks_stacks_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES public.stacks(id) ON DELETE CASCADE;


--
-- Name: tasks_stacks tasks_stacks_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks_stacks
    ADD CONSTRAINT tasks_stacks_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE CASCADE;


--
-- Name: user_history user_history_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT user_history_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: user_history user_history_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT user_history_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE SET NULL;


--
-- Name: user_history user_history_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT user_history_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON DELETE SET NULL;


--
-- Name: user_history user_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_history
    ADD CONSTRAINT user_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_social_links user_social_links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_social_links
    ADD CONSTRAINT user_social_links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users_stacks users_stacks_stack_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_stacks
    ADD CONSTRAINT users_stacks_stack_id_fkey FOREIGN KEY (stack_id) REFERENCES public.stacks(id) ON DELETE CASCADE;


--
-- Name: users_stacks users_stacks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_stacks
    ADD CONSTRAINT users_stacks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict 7otcg37hbmlUdzAGFQuHIdhST9FVhzpzEnBd3z75qOXdhJ0PpRTeB8QoNyed2gT

