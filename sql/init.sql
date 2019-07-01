CREATE TABLE `subscriber` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active_status` tinyint(4) NOT NULL DEFAULT '1',
  `created_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profession` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `career` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active_status` tinyint(4) NOT NULL DEFAULT '1',
  `created_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agree_explore` tinyint(4) DEFAULT '0',
  `resume_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_latter_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `download_record` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active_status` tinyint(4) NOT NULL DEFAULT '1',
  `created_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


ALTER TABLE `download_record` ADD `country` varchar(255)  DEFAULT NULL
