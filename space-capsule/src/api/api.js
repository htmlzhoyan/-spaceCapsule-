import axios from 'axios';
var Mock = require('mockjs')
//let address = process.env.API_ROOT
///let address = 'http://xlzk.xlxy.edu.cn:8080/wisdom-classrome'
//let address = 'http://192.168.0.231:8080/wisdom-classrome'
//let address = 'http://localhost:8080/wisdom-classrome'
let address = 'http://47.101.180.252:8080/wisdom-classrome'
let base = address;

// 根据周节获取预习反馈统计
export const getPreviewStatistics2Api = (params, urlFrom) => {
  const url = urlFrom + '/teacher/prepare/previewStatistics'
  return axios.get(url, { params: params }).then((res) => res.data)
}
// 预习资料查询
export const getPreviewCountByTeacher = (params, urlFrom) => {
  const url = urlFrom + '/teacher/prepare/previewResourceCountByTeacher'
  return axios.get(url, { params: params }).then((res) => res.data)
}

// 获取分享参数
export const circularPitchInfo = (params, urlFrom) => {
  const url = urlFrom + '/dataBase/databasecircularpitch/circularPitchInfo'
  return axios.get(url, { params: params }).then((res) => res.data)
}
//资源发布数
export const todayLiveResourcePublish = params => {
  // console.log(str)
  return axios.get(`${base}/statistics/resource/todayLiveResourcePublish`,
    { params: params }).then((res) => res.data);
};







// let params = {}
//       params.semesterId = sessionStorage.getItem('spaceSemesterId')
//       handelCheckinApi(params).then(res => {

//       })

//新接口
export const getCurrentSemesterApi = params => {
  return axios.get(`${base}/spaceCapsule/getCurrentSemester`,
    { params: params }).then((res) => res.data);
};
//签到接口
export const handelCheckinApi = params => {

  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'checkinStudent': 24,
      'classClass': 36,
      'totalStudent': 45,
    })
    resolve(data)
  });
  return p;
};

//网路课程数
export const teacherCurriculum = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = [{ id: 376, facultyId: 1, facultyName: "公共教学部", teacherNum: 1, curriculumNum: 1 },
    { id: 377, facultyId: 2, facultyName: "文学与传媒学院", teacherNum: 89, curriculumNum: 81 },
    { id: 378, facultyId: 3, facultyName: "机电工程学院", teacherNum: 58, curriculumNum: 53 },
    { id: 379, facultyId: 4, facultyName: "商学院", teacherNum: 89, curriculumNum: 84 },
    { id: 380, facultyId: 5, facultyName: "外国语学院", teacherNum: 98, curriculumNum: 87 },
    { id: 381, facultyId: 6, facultyName: "艺术学院", teacherNum: 72, curriculumNum: 69 },
    { id: 382, facultyId: 7, facultyName: "土木建筑工程学院", teacherNum: 66, curriculumNum: 64 },
    { id: 383, facultyId: 8, facultyName: "教育学院", teacherNum: 80, curriculumNum: 72 }]
    resolve({
      'code': 0,
      'facultyTeacherCurriculumEntityList': data
    })
  });
  return p;
};

//新联学院师生使用统计
export const teacherStudentUsageStatisticApi = params => {
  return axios.get(`${base}/spaceCapsule/teacherStudentUsageStatistic`,
    { params: params }).then((res) => res.data);
};
//资源数
export const classClassResourceStatisticApi = params => {

  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'picSize': 40,
      'smallClassSize': 50,
      'textSize': 60,
      'total': 150,
    })
    resolve(data)
  });
  return p;
};
//资源类型占比
export const resourceTypeApi = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'data': {
        'doc': 40,
        'link': 50,
        'other': 60,
        'pic': 14,
        'redio': 15,
      }
    })
    resolve(data)
  });
  return p;
  // return axios.get(`${base}/spaceCapsule/resourceType`,
  //   { params: params }).then((res) => res.data);
};
//.实时动态
export const getResourceRealTime = params => {
  return axios.get(`${base}/statistics/resourceAddLog/listAll`,
    { params: params }).then((res) => res.data);
};

//活跃课程
export const topActiveCurriculum = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = [{ id: 174, professionId: 5, curriculumName: "汉语国际教育", teacherName: '王珞丹' },
    { id: 174, professionId: 5, curriculumName: "机电学院", teacherName: '王珞丹' },
    { id: 174, professionId: 5, curriculumName: "公共教学部", teacherName: '王一诺' },
    { id: 174, professionId: 5, curriculumName: "土木工程学院", teacherName: '王珞丹' },
    { id: 180, professionId: 14, curriculumName: "高等数学专业", teacherName: '赵岩' },
    { id: 174, professionId: 5, curriculumName: "计算机工程", teacherName: '肖战' }]
    resolve({
      'code': 0,
      'list': data

    })
  });
  return p;
};
//院系TOP5
export const toplistApi = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = [{ id: 130, facultyId: 2, facultyName: "文学与传媒学院", activeCount: 227 },
    { id: 131, facultyId: 4, facultyName: "商学院", activeCount: 45 },
    { id: 132, facultyId: 8, facultyName: "教育学院", activeCount: 40 },
    { id: 133, facultyId: 5, facultyName: "外国语学院", activeCount: 33 },
    { id: 134, facultyId: 1, facultyName: "公共教学部", activeCount: 13 },
    { id: 135, facultyId: 7, facultyName: "土木建筑工程学院", activeCount: 11 },
    { id: 136, facultyId: 6, facultyName: "艺术学院", activeCount: 10 }]

    resolve({
      'code': 0,
      'page': {
        list: data
      }
    })
  });
  return p;
};

//专业TOP5
export const professionlistApi = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = [{ id: 174, professionId: 5, professionName: "汉语国际教育", activeCount: 78 },
    { id: 176, professionId: 6, professionName: "广播电视编导", activeCount: 50 },
    { id: 177, professionId: 115, professionName: "智慧课堂专业", activeCount: 39 },
    { id: 178, professionId: 3, professionName: "语文教育(专科)", activeCount: 34 },
    { id: 179, professionId: 68, professionName: "英语教育（专科）", activeCount: 32 },
    { id: 180, professionId: 14, professionName: "汉语言文学", activeCount: 20 },
    { id: 181, professionId: 8, professionName: "广播电视编导(专升本)", activeCount: 18 },
    { id: 182, professionId: 116, professionName: "智慧课堂专业", activeCount: 17 },
    { id: 183, professionId: 114, professionName: "智慧课堂专业", activeCount: 13 }]

    resolve({
      'code': 0,
      'page': {
        list: data
      }
    })
  });
  return p;
};

//全校课堂活动统计
export const queryActivityCountApi = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'entity': {
        'brainstormingCount': 27,
        'discussionCount': 41,
        'jobCount': 52,
        'performanceCount': 45,
        'previewCount': 45,
        'testCount': 58,
        'voteCount': 34,
      }
    })
    resolve(data)
  });
  return p;
};
//作业平均分数
export const queryJobScoreDistributionApi = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'entity': {
        'eightyCount': 27,
        'fortyCount': 41,
        'hundredCount': 52,
        'sixtyCount': 45,
        'twentyCount': 45,
        'totalCount': 58
      }
    })
    resolve(data)
  });
  return p;
};

//作业平均分数
export const teacherStudentActivityApi = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'data': {
        'beforeStudentSize': 27,
        'beforeTeacherSize': 41,
        'currentSize': 52,
        'currentStudentSize': 45,
        'currentTeacherSize': 45,
        'lastSize': 58,
        'studentSize': 58,
        'teacherSize': 58,
      }
    })
    resolve(data)
  });
  return p;
};

// //各院系学年学生
// export const queryStudentLoginCountApi = params => {
//   return axios.get(`${base}/statistics/school/queryStudentLoginCount`,
//     { params: params }).then((res) => res.data);
// };

//查询各学年各学院学生人数
export const getPeriodStuTotal = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let loginList = [{ result: 500, name: "文学与传媒学院" },
    { result: 550, name: "外国语学院" },
    { result: 580, name: "艺术学院" },
    { result: 1000, name: "土木建筑工程学院" },
    { result: 1200, name: "教育学院" }]

    let orderMap = [{ count: 4842, name: "文学与传媒学院" },
    { count: 3481, name: "商学院" },
    { count: 3362, name: "教育学院" },
    { count: 3193, name: "外国语学院" },
    { count: 2264, name: "土木建筑工程学院" },
    { count: 2032, name: "机电工程学院" },
    { count: 1753, name: "艺术学院" },
    { count: 98, name: "公共教学部" }]
    let result = [
      { result: 634, period: "2017", name: "商学院" },
      { result: 400, period: "2017", name: "土木建筑工程学院" },
      { result: 601, period: "2017", name: "外国语学院" },
      { result: 631, period: "2017", name: "教育学院" },
      { result: 922, period: "2017", name: "文学与传媒学院" },
      { result: 325, period: "2017", name: "机电工程学院" },
      { result: 179, period: "2017", name: "艺术学院" },
      { result: 972, period: "2018", name: "商学院" },
      { result: 577, period: "2018", name: "土木建筑工程学院" },
      { result: 783, period: "2018", name: "外国语学院" },
      { result: 760, period: "2018", name: "教育学院" },
      { result: 1122, period: "2018", name: "文学与传媒学院" },
      { result: 480, period: "2018", name: "机电工程学院" },
      { result: 406, period: "2018", name: "艺术学院" },
      { result: 772, period: "2019", name: "商学院" },
      { result: 469, period: "2019", name: "土木建筑工程学院" },
      { result: 918, period: "2019", name: "外国语学院" },
      { result: 899, period: "2019", name: "教育学院" },
      { result: 1349, period: "2019", name: "文学与传媒学院" },
      { result: 399, period: "2019", name: "机电工程学院" },
      { result: 386, period: "2019", name: "艺术学院" },
      { result: 98, period: "2020", name: "公共教学部" },
      { result: 603, period: "2020", name: "商学院" },
      { result: 448, period: "2020", name: "土木建筑工程学院" },
      { result: 565, period: "2020", name: "外国语学院" },
      { result: 677, period: "2020", name: "教育学院" },
      { result: 987, period: "2020", name: "文学与传媒学院" },
      { result: 430, period: "2020", name: "机电工程学院" },
      { result: 598, period: "2020", name: "艺术学院" }]
    resolve({
      'code': 0,
      'loginList': loginList,
      'orderMap': orderMap,
      'result': result

    })
  });
  return p;
};


//.学院资源占比
export const facultyResource = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = [{ id: 153, facultyId: 1, facultyName: "公共教学部", count: 1 },
    { id: 154, facultyId: 2, facultyName: "文学与传媒学院", count: 13 },
    { id: 155, facultyId: 4, facultyName: "商学院", count: 12 },
    { id: 156, facultyId: 5, facultyName: "外国语学院", count: 6 },
    { id: 157, facultyId: 6, facultyName: "艺术学院", count: 46 },
    { id: 158, facultyId: 7, facultyName: "土木建筑工程学院", count: 20 },
    { id: 159, facultyId: 8, facultyName: "教育学院", count: 13 }]

    resolve({
      'code': 0,
      'list': data
    })
  });
  return p;
};

//学校资源发布走势 （最近一个月）
export const resourceTrend = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = [{ date: "2020-11-30", count: 2 },
    { date: "2020-12-22", count: 3 },
    { date: "2020-12-23", count: 11 },
    { date: "2020-12-24", count: 4 },
    { date: "2020-12-25", count: 6 },
    { date: "2020-12-28", count: 19 },
    { date: "2020-12-29", count: 29 },
    { date: "2020-12-30", count: 5 }]

    resolve({
      'code': 0,
      'list': data
    })
  });
  return p;
};
//院系签到排民
export const todayLiveCheckin = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'map': {
        'facultyCheckinMonthAttendance|6': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'name|+1': ['教育学院', '体育学院', '艺术学院', '高数学院', '美术学院', '化学学院'],
          'attendance|+1': [0.4, 0.5, 0.9, 0.8, 0.6, 0.8],
        }]
      }
    })
    resolve(data)
  });
  return p;
};

//活动类型占比
export const activityLesson = params => {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    let data = Mock.mock({
      'code': 0,
      'map': {
        'brainNum': 24,
        'discussNum': 36,
        'performanceNum': 45,
        'testNum': 54,
        'voteNum': 34
      }
    })
    resolve(data)
  });
  return p;
};
//各院校拟近7天运行
export const acurriculumRunNumApi = params => {
  // console.log(str)
  return axios.get(`${base}/spaceCapsule/facultyRunNumber`,
    { params: params }).then((res) => res.data);
};
