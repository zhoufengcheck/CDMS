/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : cdms

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2017-02-20 17:37:52
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
  PRIMARY KEY (`close_id`),
  KEY `sourceclose` (`source_id`),
  KEY `classify` (`classify_id`),
  CONSTRAINT `classify` FOREIGN KEY (`classify_id`) REFERENCES `t_classify` (`classify_id`),
  CONSTRAINT `sourceclose` FOREIGN KEY (`source_id`) REFERENCES `t_source` (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_close
-- ----------------------------
INSERT INTO `t_close` VALUES ('28', '时尚连帽卫衣aasad', '4', '234', '234', '灰色，黑色', 'S,M,L,XL', '23', '3', 'pic.jpg');
INSERT INTO `t_close` VALUES ('77', '连衣裙', '4', '100', '300', '白色，灰色，浅蓝', 'S,M,XL', '裙子大方简洁', '2', 'pic.jpg');
INSERT INTO `t_close` VALUES ('78', '休闲哈伦裤', '3', '100', '130', '黑色，灰色', 'S,M,L,XL', '休闲大方', '3', 'pic.jpg');
INSERT INTO `t_close` VALUES ('81', '牛仔裤', '2', '100', '200', '蓝色，灰色，黑色', 'S,M,L,XL', '显瘦', '2', 'pic.jpg');
INSERT INTO `t_close` VALUES ('83', '1', '4', '123', '11', 'dh1', 'ewq', 'qwe', '3', 'qw');
INSERT INTO `t_close` VALUES ('84', 'ew', '4', '123', '122', '1', '1', '1', '3', '3');
INSERT INTO `t_close` VALUES ('86', 'wer', '2', '104', '100', 'wer', 'S', 'wer', '1', 'QQ图片20161108111738 (2).jpg');
INSERT INTO `t_close` VALUES ('87', 'wer', '2', '100', '100', 'wre', 'S', 'rwe', '1', 'QQ图片20161108111738 (2).jpg');
INSERT INTO `t_close` VALUES ('88', 'wer', '3', '100', '100', 'dg', 'S', 'gtr', '2', 'pic.jpg');
INSERT INTO `t_close` VALUES ('89', 'ert', '2', '100', '100', 'df', 'S', 'df', '1', 'pic.jpg');
INSERT INTO `t_close` VALUES ('90', 'df', '4', '100', '100', 'gt', 'S,M,L,XL', 'trg', '1', 'pic.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_feed
-- ----------------------------
INSERT INTO `t_feed` VALUES ('6', 'zkasjf', '1994-12-02', 'shfgjgh');
INSERT INTO `t_feed` VALUES ('7', 'sdg', '1994-12-02', 'dgrh');
INSERT INTO `t_feed` VALUES ('8', 'sfg', '1994-12-02', 'setrey');
INSERT INTO `t_feed` VALUES ('9', '周凤', '2017-01-30', '1234');

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
INSERT INTO `t_sellcon` VALUES ('84', '2017-02-13', '0');
INSERT INTO `t_sellcon` VALUES ('86', '2017-02-17', '2');
INSERT INTO `t_sellcon` VALUES ('87', '2017-02-08', '2');
INSERT INTO `t_sellcon` VALUES ('88', '2017-02-06', '2');
INSERT INTO `t_sellcon` VALUES ('89', '2017-01-29', '12');
INSERT INTO `t_sellcon` VALUES ('90', '2017-02-02', '1');
INSERT INTO `t_sellcon` VALUES ('81', '0000-00-00', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_source
-- ----------------------------
INSERT INTO `t_source` VALUES ('2', 'Alice服装旗舰点', '重庆市', '657892');
INSERT INTO `t_source` VALUES ('3', '露露商城', '成都', '123456');
INSERT INTO `t_source` VALUES ('4', '方可服饰', '南川', '2222');
INSERT INTO `t_source` VALUES ('5', '咳咳商城', '广州', '2323');
INSERT INTO `t_source` VALUES ('6', '嘟嘟商城', '北京', '344');
INSERT INTO `t_source` VALUES ('7', '项目商城', '福建', '333');
INSERT INTO `t_source` VALUES ('8', '二分服饰', '贵州市', '34234');
INSERT INTO `t_source` VALUES ('9', '地方服饰', '上海', '1234');
INSERT INTO `t_source` VALUES ('11', '积分积分', '天津', '2324');
INSERT INTO `t_source` VALUES ('13', 'Mike', '123', '1212');
INSERT INTO `t_source` VALUES ('14', '阿斯顿', 'ad', '111');

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
