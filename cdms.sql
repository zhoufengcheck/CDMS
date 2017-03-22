/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : cdms

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2017-03-22 22:07:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_classify`
-- ----------------------------
DROP TABLE IF EXISTS `t_classify`;
CREATE TABLE `t_classify` (
  `classify_id` int(10) NOT NULL AUTO_INCREMENT,
  `classify_name` varchar(100) NOT NULL,
  PRIMARY KEY (`classify_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_classify
-- ----------------------------
INSERT INTO `t_classify` VALUES ('1', '衣服');
INSERT INTO `t_classify` VALUES ('2', '裙子');
INSERT INTO `t_classify` VALUES ('3', '裤子');

-- ----------------------------
-- Table structure for `t_close`
-- ----------------------------
DROP TABLE IF EXISTS `t_close`;
CREATE TABLE `t_close` (
  `close_id` int(50) NOT NULL AUTO_INCREMENT,
  `close_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `source_id` int(10) NOT NULL,
  `cost_price` varchar(50) CHARACTER SET utf8 NOT NULL,
  `sale_price` varchar(50) CHARACTER SET utf8 NOT NULL,
  `color` varchar(50) CHARACTER SET utf8 NOT NULL,
  `size` varchar(50) CHARACTER SET utf8 NOT NULL,
  `describle` varchar(100) CHARACTER SET utf8 NOT NULL,
  `classify_id` int(10) NOT NULL,
  `img_path` varchar(100) CHARACTER SET utf8 NOT NULL,
  `rest` int(50) NOT NULL,
  PRIMARY KEY (`close_id`),
  KEY `sourceclose` (`source_id`),
  KEY `classify` (`classify_id`),
  CONSTRAINT `classify` FOREIGN KEY (`classify_id`) REFERENCES `t_classify` (`classify_id`),
  CONSTRAINT `sourceclose` FOREIGN KEY (`source_id`) REFERENCES `t_source` (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_close
-- ----------------------------
INSERT INTO `t_close` VALUES ('91', '浅色破洞牛仔裤', '16', '101', '180', '浅蓝色', 'S,M,L,XL', '服装破洞处理。时尚，简单，大方', '3', 'pant2.jpg', '0');

-- ----------------------------
-- Table structure for `t_feed`
-- ----------------------------
DROP TABLE IF EXISTS `t_feed`;
CREATE TABLE `t_feed` (
  `feed_id` int(100) NOT NULL AUTO_INCREMENT,
  `autor` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `feed_content` varchar(200) NOT NULL,
  PRIMARY KEY (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_feed
-- ----------------------------

-- ----------------------------
-- Table structure for `t_sellcon`
-- ----------------------------
DROP TABLE IF EXISTS `t_sellcon`;
CREATE TABLE `t_sellcon` (
  `close_id` int(50) NOT NULL DEFAULT '0',
  `sell_date` date NOT NULL,
  `sell_number` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_sellcon
-- ----------------------------
INSERT INTO `t_sellcon` VALUES ('28', '2017-02-04', '10');
INSERT INTO `t_sellcon` VALUES ('77', '2017-02-07', '2');
INSERT INTO `t_sellcon` VALUES ('78', '2017-02-15', '4');
INSERT INTO `t_sellcon` VALUES ('83', '2017-02-05', '11');
INSERT INTO `t_sellcon` VALUES ('86', '2017-02-17', '2');
INSERT INTO `t_sellcon` VALUES ('87', '2017-02-08', '2');
INSERT INTO `t_sellcon` VALUES ('88', '2017-02-06', '2');
INSERT INTO `t_sellcon` VALUES ('89', '2017-01-29', '12');
INSERT INTO `t_sellcon` VALUES ('90', '2017-02-02', '1');
INSERT INTO `t_sellcon` VALUES ('81', '2017-02-13', '3');
INSERT INTO `t_sellcon` VALUES ('92', '2017-02-20', '1');
INSERT INTO `t_sellcon` VALUES ('92', '2016-01-04', '20');
INSERT INTO `t_sellcon` VALUES ('28', '2017-01-29', '12');
INSERT INTO `t_sellcon` VALUES ('77', '2017-02-21', '1');
INSERT INTO `t_sellcon` VALUES ('81', '2017-01-03', '5');
INSERT INTO `t_sellcon` VALUES ('77', '2017-01-04', '7');
INSERT INTO `t_sellcon` VALUES ('77', '2017-01-31', '1');
INSERT INTO `t_sellcon` VALUES ('84', '2017-02-14', '11');
INSERT INTO `t_sellcon` VALUES ('87', '2017-02-06', '2');
INSERT INTO `t_sellcon` VALUES ('83', '2017-02-14', '12');
INSERT INTO `t_sellcon` VALUES ('87', '2017-02-14', '11');
INSERT INTO `t_sellcon` VALUES ('90', '2017-02-06', '0');
INSERT INTO `t_sellcon` VALUES ('92', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('88', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('77', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('81', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('89', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('28', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('86', '2017-02-14', '1');
INSERT INTO `t_sellcon` VALUES ('90', '2017-01-29', '11');
INSERT INTO `t_sellcon` VALUES ('28', '2017-02-25', '13');
INSERT INTO `t_sellcon` VALUES ('78', '2017-02-25', '24');
INSERT INTO `t_sellcon` VALUES ('28', '2017-03-04', '5');
INSERT INTO `t_sellcon` VALUES ('77', '2017-03-04', '33');
INSERT INTO `t_sellcon` VALUES ('78', '2017-03-04', '42');

-- ----------------------------
-- Table structure for `t_source`
-- ----------------------------
DROP TABLE IF EXISTS `t_source`;
CREATE TABLE `t_source` (
  `source_id` int(50) NOT NULL AUTO_INCREMENT,
  `source_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  PRIMARY KEY (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_source
-- ----------------------------
INSERT INTO `t_source` VALUES ('12', 'Grace服装铺', '重庆市渝北区', '010-71892361');
INSERT INTO `t_source` VALUES ('13', '启程服饰', '北京海淀区', '010-23941980');
INSERT INTO `t_source` VALUES ('14', 'Alice清新女装', '广东广州市', '010-28371894');
INSERT INTO `t_source` VALUES ('15', 'Lily服饰', '北京海淀区', '010-27371894');
INSERT INTO `t_source` VALUES ('16', '以纯服装', '北京通州区', '010-98638926');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `user_name` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `pwd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('周凤', '11');
INSERT INTO `t_user` VALUES ('bb', '22');
