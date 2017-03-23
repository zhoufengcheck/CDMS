/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : cdms

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2017-03-23 15:23:58
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
  `describle` varchar(400) CHARACTER SET utf8 NOT NULL,
  `classify_id` int(10) NOT NULL,
  `img_path` varchar(100) CHARACTER SET utf8 NOT NULL,
  `rest` int(50) NOT NULL,
  PRIMARY KEY (`close_id`),
  KEY `sourceclose` (`source_id`),
  KEY `classify` (`classify_id`),
  CONSTRAINT `classify` FOREIGN KEY (`classify_id`) REFERENCES `t_classify` (`classify_id`),
  CONSTRAINT `sourceclose` FOREIGN KEY (`source_id`) REFERENCES `t_source` (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_close
-- ----------------------------
INSERT INTO `t_close` VALUES ('91', '浅色破洞牛仔裤', '16', '101', '180', '浅蓝色', 'S,M,L,XL', '服装破洞处理。时尚，简单，大方', '3', 'pants3.jpg', '43');
INSERT INTO `t_close` VALUES ('92', '粉色收腰毛呢大衣', '12', '200', '300', '粉色', 'S,M,L,XL', '该衣服为粉色系，主要材质是羊毛，时尚大气，中长款', '1', 'close2.jpg', '23');
INSERT INTO `t_close` VALUES ('93', '黄色毛呢大衣外套', '12', '200', '300', '黄色', 'S,M,L,XL', '该衣服为黄色系，收腰，搭配黑色裤子，时尚，休闲', '1', 'close3.jpg', '23');
INSERT INTO `t_close` VALUES ('94', '短款休闲格子毛呢外套', '17', '300', '498', '灰黑格子', 'S,M,L,XL', '改服装的主要材质是羊毛，厚实，时尚大气', '1', 'close4.jpg', '122');
INSERT INTO `t_close` VALUES ('95', '春季收腰长袖连衣裙', '14', '200', '320', '天蓝色', 'S,M,L,XL', '该裙子风格为清新风，长袖，无论是春季还是秋季都可以穿，淑女气质', '2', 'dress1.jpg', '88');
INSERT INTO `t_close` VALUES ('96', '黑色蕾丝长袖伞裙', '12', '180', '230', '黑色', 'S,M,L,XL', '该裙装为长袖，无论在春季还是秋季，都比较适宜，此外，黑色蕾丝形成的伞裙状为衣服添加了特点', '2', 'dress2.jpg', '27');
INSERT INTO `t_close` VALUES ('97', '休闲卫衣裙', '13', '120', '200', '黑色+迷彩', 'S,M,L,XL', '该裙子比较休闲，就和卫衣与裙子的风格，以黑色浇上迷彩色。', '2', 'dress8.jpg', '89');
INSERT INTO `t_close` VALUES ('98', '白色刺绣衬衣', '15', '120', '157', '白色', 'S,M,L,XL', '该衬衣比较适合春秋季节，气质清新舒适，搭配刺绣，服装更具特色', '1', 'iu8.jpg', '12');
INSERT INTO `t_close` VALUES ('99', '黄色休闲纯色衬衣', '12', '120', '199', '黄色', 'S,M,L,XL', '该衣服为纯棉制作，服装为纯色，加上独特的剪裁', '1', 'jpg1.jpg', '33');
INSERT INTO `t_close` VALUES ('100', '蕾丝打底衫', '13', '100', '168', '白色', 'S,M,L,XL', '蕾丝材质，纯色系，大方优雅，可搭配裙装', '1', 'pic4.jpg', '34');
INSERT INTO `t_close` VALUES ('101', '蓝色破洞九分牛仔裤', '17', '210', '300', '蓝色', 'S,M,L,XL', '九分裤，前面为破洞，比较时尚宽松', '3', 'pant2.jpg', '23');
INSERT INTO `t_close` VALUES ('106', '蓝色宽松牛仔裤九分', '12', '100', '137', '深蓝色', 'S,M,L,XL', '宽松休闲', '1', 'pant1.jpg', '20');

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_feed
-- ----------------------------
INSERT INTO `t_feed` VALUES ('10', 'Mike', '2017-02-26', '蕾丝打底衫已经售完，请记得进货');
INSERT INTO `t_feed` VALUES ('11', 'Mike', '2017-03-17', '顾客退换一件春季收腰长袖连衣裙，将原来的小号换成了中号');
INSERT INTO `t_feed` VALUES ('12', 'Mike', '2017-03-08', '春装即将上新，根据分析，今年比较流行伞裙，进货是可以根据该方向收进裙装');
INSERT INTO `t_feed` VALUES ('13', 'Mike', '2017-03-23', '有的顾客说服装类型不够全面');
INSERT INTO `t_feed` VALUES ('14', 'Mike', '2017-03-08', '顾客说，店里的服装袋子不是特别好看，可以试着更换');
INSERT INTO `t_feed` VALUES ('15', 'Mike', '2017-03-07', '黄色休闲纯色衬衣在上月销售量比较好，可以多进一点货源');
INSERT INTO `t_feed` VALUES ('16', 'Mike', '2017-02-26', '休闲卫衣裙在上个月销售量较低，可以考虑打折将衣服售出');

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
INSERT INTO `t_sellcon` VALUES ('91', '2017-01-27', '3');
INSERT INTO `t_sellcon` VALUES ('91', '2017-01-11', '0');
INSERT INTO `t_sellcon` VALUES ('91', '2017-01-17', '4');
INSERT INTO `t_sellcon` VALUES ('91', '2017-02-07', '2');
INSERT INTO `t_sellcon` VALUES ('91', '2017-02-13', '2');
INSERT INTO `t_sellcon` VALUES ('91', '2017-02-18', '6');
INSERT INTO `t_sellcon` VALUES ('91', '2017-03-09', '3');
INSERT INTO `t_sellcon` VALUES ('92', '2017-02-14', '4');
INSERT INTO `t_sellcon` VALUES ('92', '2017-01-12', '6');
INSERT INTO `t_sellcon` VALUES ('92', '2017-03-08', '1');
INSERT INTO `t_sellcon` VALUES ('92', '2017-03-21', '1');
INSERT INTO `t_sellcon` VALUES ('93', '2017-02-10', '1');
INSERT INTO `t_sellcon` VALUES ('93', '2017-01-22', '1');
INSERT INTO `t_sellcon` VALUES ('93', '2017-03-01', '1');
INSERT INTO `t_sellcon` VALUES ('94', '2017-01-02', '1');
INSERT INTO `t_sellcon` VALUES ('94', '2017-02-03', '3');
INSERT INTO `t_sellcon` VALUES ('95', '2017-03-08', '2');
INSERT INTO `t_sellcon` VALUES ('95', '2017-02-15', '2');
INSERT INTO `t_sellcon` VALUES ('95', '2017-01-31', '1');
INSERT INTO `t_sellcon` VALUES ('96', '2017-01-08', '1');
INSERT INTO `t_sellcon` VALUES ('96', '2017-02-09', '2');
INSERT INTO `t_sellcon` VALUES ('96', '2017-03-19', '1');
INSERT INTO `t_sellcon` VALUES ('97', '2017-01-17', '3');
INSERT INTO `t_sellcon` VALUES ('98', '2017-03-07', '3');
INSERT INTO `t_sellcon` VALUES ('98', '2017-02-28', '2');
INSERT INTO `t_sellcon` VALUES ('98', '2017-02-12', '1');
INSERT INTO `t_sellcon` VALUES ('99', '2017-03-06', '3');
INSERT INTO `t_sellcon` VALUES ('99', '2017-02-05', '1');
INSERT INTO `t_sellcon` VALUES ('99', '2017-01-16', '1');
INSERT INTO `t_sellcon` VALUES ('100', '2017-03-09', '3');
INSERT INTO `t_sellcon` VALUES ('100', '2017-03-11', '4');
INSERT INTO `t_sellcon` VALUES ('100', '2017-02-18', '1');
INSERT INTO `t_sellcon` VALUES ('101', '0000-00-00', '0');
INSERT INTO `t_sellcon` VALUES ('101', '0000-00-00', '0');
INSERT INTO `t_sellcon` VALUES ('101', '2017-01-11', '4');
INSERT INTO `t_sellcon` VALUES ('106', '2017-03-06', '5');
INSERT INTO `t_sellcon` VALUES ('106', '2017-01-25', '1');
INSERT INTO `t_sellcon` VALUES ('106', '2017-02-13', '1');
INSERT INTO `t_sellcon` VALUES ('92', '2017-02-03', '2');
INSERT INTO `t_sellcon` VALUES ('95', '2017-03-23', '3');
INSERT INTO `t_sellcon` VALUES ('99', '2017-03-23', '2');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_source
-- ----------------------------
INSERT INTO `t_source` VALUES ('12', 'Grace服装铺', '重庆市渝北区', '010-71892362');
INSERT INTO `t_source` VALUES ('13', '启程服饰', '北京海淀区', '010-23941980');
INSERT INTO `t_source` VALUES ('14', 'Alice清新女装', '广东广州市', '010-28371894');
INSERT INTO `t_source` VALUES ('15', 'Lily服饰', '北京海淀区', '010-27371894');
INSERT INTO `t_source` VALUES ('16', '以纯服装', '北京通州区', '010-98638926');
INSERT INTO `t_source` VALUES ('17', '艾米女装', '天津市', '010-56739872');

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
INSERT INTO `t_user` VALUES ('Mike', '199464');
