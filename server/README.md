GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%';

FLUSH PRIVILEGES;

create database common;

CREATE TABLE `enquiry` (
  `id` varchar(255) NOT NULL,
  `active_status` tinyint(4) NOT NULL DEFAULT '1',
  `created_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `updated_date` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
