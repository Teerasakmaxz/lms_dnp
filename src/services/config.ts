import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigService {

	loading: boolean;
	timestamp: number;
	lastaccess: number; //Last access datetime with website
	fetchedResources: any;
	user: any;
	isLoggedIn: boolean = false;
	homePage: any;
	baseUrl: string;
	oAuthUrl: string;
	environment: any;
	settings: any;
	defaultMenu: any;
	per_view: number = 10;
	translations: any;
	directoryFilters: any;

	/*
		IMPORTANT DO NOT TOUCH
	*/
	defaultTrack: any;
	track: any;
	trackSync: any;
	contactinfo: any;
	terms_conditions: any;
	termAll: any;

	unread_notifications_count: number = 0;
	wallet: any = [];
	/*== END == */

	constructor(
		private storage: Storage,
		) {

		this.loading = true;
		this.timestamp = Math.floor(new Date().getTime() / 1000);
		this.environment = {
			'cacheDuration': 86400,
		};

		this.lastaccess = 0;


		this.per_view = 5;
		this.settings = {
			'version': 1,
			
			'url': 'http://localhost:13000/',
			// 'url':'http://203.154.117.72:13000/',
			'client_id': '',
			'client_secret': '', //Fetched from API call
			'state': '', // FETCHED from Site
			'access_token': '', // FETCHED on Login 
			'registration': 'app',//'app' or 'site' or false
			'login': 'app',//Select from 'app' or 'site' or false
			'facebook': {
				'enable': true,
				'app_id': 491338181212175
			},
			'google': {
				'enable': true,
			},
			'per_view': 5,
			'force_mark_all_questions': false,
			'wallet': true,					// <<----------REQUIRES WPLMS version 3.4
			'inappbrowser_purchases': true, // <<----------REQUIRES WPLMS version 3.4
			'rtl': false,
		};

		this.baseUrl = this.settings.url;
		this.oAuthUrl = this.settings.url + 'wplmsoauth/';

		this.defaultMenu = {
			'home': 'Home',
			'about': 'About',
			'courses': 'Courses',
			'instructors': 'Instructors',
			'contact': 'Contact'
		};

		this.homePage = {
			'featuredCourseSlider': 1,
			'categories': 1,
			'popular': 1,
			'featured': 1,
		};

		this.directoryFilters = {
			'categories': 1,
			'instructors': 1,
			'locations': 1,
			'levels': 1,
			'free_paid': 1,
			'online_offline': 0,
			'start_date': 0,
		};
		this.wallet = [
			{ 'product_id': 'wplms_r_50', 'points': 50 },
			{ 'product_id': 'sample', 'points': 50 },
		];

		this.defaultTrack = {
			'version': 1,
			'counter': 0,
			'user': 0,
			'featured': 0,// Check if there is any change in featured courses 
			'popular': 0,// Check if there is any change in popular courses 
			'allcoursecategories': 0,
			'allcourselocations': 0,
			'allcourselevels': 0,
			'allcourses': 0,
			'allposts': 0,
			'transactions': 0,
			'posts': [],
			'dashboardCharts': [],
			'courses': [], // if loaded it exists here
			'stats': 0, // Check if any need to reload student statistics
			'notifications': 0, // Check if any new notifications are added.
			'announcements': 0, // Check if any new announcements are added for user
			'allinstructors': 0,//track if new instructor is added in site
			'instructors': [], //if loaded it exists here
			'profile': 0,
			'profiletabs': [],//if loaded it exists here
			'reviews': [],
			'course_status': [], //load course curriclum & statuses
			'statusitems': [],
			'saved_results': [],
		};
		this.track = this.defaultTrack;
		this.unread_notifications_count = 0;

		this.translations = {
			// 'prath':'',
			'home_title': 'หน้าแรก',
			'home_subtitle': 'Featured Items',
			'start_course': 'Start',
			'search_title': 'Searching..',
			'continue_course': 'Continue',
			'completed_course': 'Completed',
			'expired_course': 'Expired',
			'evaluation_course': 'Under Evaluation',
			'no_reviews': 'No reviews found for this course.',
			'year': 'year',
			'years': 'years',
			'month': 'month',
			'months': 'months',
			'week': 'week',
			'weeks': 'weeks',
			'day': 'day',
			'days': 'days',
			'hour': 'hour',
			'hours': 'hours',
			'minute': 'minute',
			'minutes': 'minutes',
			'second': 'second',
			'seconds': 'seconds',
			'expired': 'expired',
			'completed': 'completed',
			'start_quiz': 'Start Quiz',
			'save_quiz': 'Save Quiz',
			'submit_quiz': 'Submit Quiz',
			'marks': 'Marks',
			'marks_obtained': 'Marks obtained',
			'max_marks': 'Maximum Marks',
			'true': 'TRUE',
			'false': 'FALSE',
			'checkanswer': 'Check Answer',
			'score': 'SCORE',
			'progress': 'PROGRESS',
			'time': 'TIME',
			'filter_options': 'FILTER OPTIONS',
			'sort_options': 'SORT OPTIONS',
			'popular': 'Popular',
			'recent': 'Recent',
			'alphabetical': 'Alphabetical',
			'rated': 'Highest Rated',
			'start_date': 'Upcoming',
			'okay': 'OKAY',
			'dismiss': 'DISMISS',
			'select_category': 'Select Category',
			'select_location': 'Select Location',
			'select_level': 'Select Level',
			'select_instructor': 'Select Instructor',
			'free_paid': 'Select Course price',
			'price': 'Price',
			'apply_filters': 'Apply Filters',
			'close': 'Close',
			'not_found': 'No courses found matching your criteria',
			'no_courses': 'No courses !',
			'course_directory_title': 'หลักสูตรทั้งหมด',
			'course_directory_sub_title': 'Course Directory',
			'all': 'All',
			'all_free': 'Free',
			'all_paid': 'Paid',
			'select_online_offline': 'Select Course type',
			'online': 'Online',
			'offline': 'Offline',
			'after_start_date': 'Starts after date',
			'before_start_date': 'Starts before date',
			'instructors_page_title': 'All Instructors',
			'instructors_page_description': 'Instructor Directory',
			'no_instructors': 'No Instructors found',
			'get_all_course_by_instructor': ' View all Courses by Instructor ',
			'profile': 'Profile',
			'about': 'About',
			'courses': 'Courses',
			'marked_answer': 'Marked Answer',
			'correct_answer': 'Correct Answer',
			'explanation': 'Explanation',
			'awaiting_results': 'Awaiting Quiz Results',
			'quiz_results': 'Quiz Result',
			'retake_quiz': 'Retake Quiz',
			'quiz_start': 'Quiz Started',
			'quiz_start_content': 'You started quiz',
			'quiz_submit': 'Quiz submitted',
			'quiz_submit_content': 'You submitted quiz',
			'quiz_evaluate': 'Quiz evaluated',
			'quiz_evaluate_content': 'Quiz Evaluated',
			'certificate': 'Certificate',
			'badge': 'Badge',
			'no_notification_found': 'No notifications found !',
			'no_activity_found': ' No Activity found !',
			'back_to_course': 'Back to Course',
			'review_course': 'Review Course',
			'finish_course': 'Finish Course',
			'login_heading': 'Login',
			'login_title': 'เข้าสู่ระบบ',
			'login_content': 'Your courses will be available on all of your devices',
			'login_have_account': 'มีบัญชีอยู่แล้ว',
			'login_signin': 'เข้าสู่ระบบ',
			'login_signup': 'สมัครสมาชิก',
			'login_terms_conditions': 'ข้อกำหนดและเงื่อนไขสำหรับการสมัครสมาชิก',
			'signin_username': 'Username',
			'signin_password': 'Password',
			'signup_username': 'Username',
			'signup_email': 'Emails',
			'signup_password': 'Password',
			'signup': 'Sign Up',
			'login_back': 'ย้อนกลับ',
			'post_review': 'Post a review for this course',
			'review_title': 'Title for Review',
			'review_rating': 'Rating for this review',
			'review_content': 'Content for Review',
			'submit_review': 'Post Review',
			'rating1star': 'Bad Course',
			'rating2star': 'Not up to the mark',
			'rating3star': 'Satisfactory',
			'rating4star': 'Good Course',
			'rating5star': 'Excellent',
			'failed': 'Failed',
			'user_started_course': 'You started a course',
			'user_submitted_quiz': 'You submitted the quiz',
			'user_quiz_evaluated': 'Quiz evaluated',
			'course_incomplete': 'Course Incomplete',
			'finish_this_course': 'Please mark all the units of this course',
			'ok': 'OK',
			'update_title': 'Updates',
			'update_read': 'Read',
			'update_unread': 'Unread',
			'no_updates': 'No updates found',
			'wishlist_title': 'Wishlist',
			'no_wishlist': 'No wishlist courses found',
			'no_finished_courses': 'No Finished courses!',
			'no_results': 'No results found!',
			'loadingresults': 'Please wait...',
			'signup_with_email_button_label': 'สมัครเรียน',
			'clear_cache': 'Clear Offline data',
			'cache_cleared': 'Offline cache cleared',
			'sync_data': 'Sync Data',
			'data_synced': 'Data Synced',
			'logout': 'Logout',
			'loggedout': 'You have successfully logged out !',
			'register_account': 'Login or Create an account to continue !',
			'email_certificates': 'Email certificates',
			'manage_data': 'Manage Stored Data',
			'saved_information': 'Saved Information',
			'client_id': 'Site Key',
			'saved_quiz_results': 'Saved Results', 'timeout': 'TimeOut',
			'app_quiz_results': 'Results',
			'change_profile_image': 'Change Profile image',
			'pick_gallery': 'Set image from gallery',
			'take_photo': 'Take my photo',
			'cancel': 'Cancel',
			'blog_page': 'Blog Page',
			'course_chart': 'สถานะ',
			'quiz_chart': 'สถิติคะแนน',
			'percentage': 'เปอร์เซ็นต์',
			'scores': 'คะแนน',
			'edit': 'Edit',
			'change': 'Change',
			'edit_profile_field': 'Edit Profile Field',
			'pull_to_refresh': 'Pull to refresh',
			'refreshing': '...refreshing',
			'contact_page': 'Contact',
			'contact_name': 'Name',
			'contact_email': 'Email',
			'contact_message': 'Message',
			'contact_follow_us': 'Follow Us',
			'invalid_url': 'Invalid url value',
			'read_notifications': 'Read notifications',
			'unread_notifications': 'Unread Notifications',
			'logout_from_device': 'Are you sure you want to logout from this device?',
			'accept_continue': 'ยอมรับและดำเนินกาต่อ',
			'finished': 'Finished',
			'active': 'Active',
			'open_results_on_site': 'Please check results for this quiz in browser.',
			'show_more': 'more',
			'show_less': 'less',

			'buy': 'Buy',
			'pricing_options': 'Pricing Options',
			'pricing_options_title': 'Pricing Options (swipe to select)',
			'home_menu_title': 'หน้าแรก',
			'about_menu_title': 'เกี่ยวกับเรา',
			'course_menu_title': 'หลักสูตรของฉัน',
			
			'learnreport_menu_title': 'รายงานผลการเรียน',
			'tablereport_menu_title': 'ตารางปัญหาที่เเจ้ง',
			'problemreport_menu_title': 'เเจ้งปัญหาการใช้งาน',
			'useraccount_menu_title': 'บัญชีผู้ใช้',
            'newsreport_menu_title':'ข่าวประชาสัมพันธ์',
			'instruction_menu_title': 'วิธีการใช้งาน',
			'ask_and_answer_menu_title': 'ถาม-ตอบ',
			'webboard_menu_title':'เว็บบอร์ด',
			'learn_menu_title':'บทเรียน',
			'pretest_menu_title':'บทเรียน',
			'chat_menu_title':'ถามตอบปัญหาการใช้งาน',
			'grouping_title':'หลักสูตร',
			'contact_menu_title':'ติดต่อเรา',
			'video_introduce' :'วีดิโอแนะนำ',
			'popular_courses_title_home_page': 'Popular Courses',
			'popular_courses_subtitle_home_page': 'Popular and trending courses',
			'categories_title_home_page': 'หมวดหมู่',
			'categories_subtitle_home_page': 'Browse courses via course category',
			'directory_search_placeholder': 'Search',
			'featured_courses': 'Featured Courses',
			'selected_courses': 'Selected courses',
			'markallquestions': 'Please mark all questions first.',

			'credit': 'Credit',
			'debit': 'Debit',
			'wallet_no_products': 'Consult Admin to create Wallet Products !',
			'wallet_no_transactions': 'No transactions found !',
			'pay_from_wallet': 'Pay from Wallet',
			'use_wallet': 'Use Wallet amount to purchase',
			'pay': 'PAY',
			'login_to_buy': 'Please Login to Buy this course',
			'login_again': 'Please re-login to purchase this course',
			'insufficient_funds': 'Insufficient funds in wallet ! Add more funds.',
			'buy_from_site': 'Buy from Site',
			'description': 'description',
			'curriculum': 'curriculum',
			'reviews': 'reviews',
			'instructors': 'instructors',
			'retakes_remaining': 'Retakes Remaining',
			'open_in_new_window': 'Open in New Window'
		};

		this.contactinfo = {
			'title': 'ติดต่อเรา',
			'message': 'บริษัท บางกอก เว็บ โซลูชั่น จำกัด 182 หมู่บ้านตะวันรุ่ง ซ.7 ถ.ลาดพร้าว 64 แยก 4 แขวงวังทองหลาง เขตวังทองหลาง กทม. 10310',
			'address': 'ท่านสามารถติดต่อ ปรึกษาทีมงานของเราได้ ในช่วงเวลาทำการระหว่าง วันจันทร์ - ศุกร์ เวลา: 9.00 ถึง 18.00 น. หรือทางแบบฟอร์มด้านล่างนี้',
			'email': 'Info@BangkokWebSolution.com',
			'phone': '02-933-9750-1',
			'twitter': 'vibethemes',
			'facebook': 'vibethemes',
		};

		this.terms_conditions = 'ในการเข้าชมหรือใช้งานเว็บไซต์ รวมถึงการดาวน์โหลดข้อมูล เนื้อหา หรือซอฟท์แวร์จากเว็บไซต์นี้ ผู้ใช้จะต้องตกลงยินยอมและปฏิบัติตามข้อกำหนด& เงื่อนใขต่างๆ หากคุณไม่สามารถยอมรับในข้อกำหนด & เงื่อนไขดังกล่าว กรุณาอย่าเข้าชมหรือใช้บริการเว็บไซต์นี้\
		เราขอสงวนสิทธิในการปรับปรุงเปลี่ยนแปลงข้อกำหนด& เงื่อนไขต่างๆอย่างสม่ำเสมอ ต่อเนื่อง โดยเราจะทำการโพสต์การเปลี่ยนแปลงต่างๆในเว็บไซต์ ดังนั้นคุณจึงควรที่จะติดตามดูการเปลี่ยนแปลงของข้อกำหนด& เงื่อนไขต่างๆอย่างสม่ำเสมอ';

		this.termAll = {
			'termOne': 'คุณได้รับสิทธิ/ ได้รับอนุญาติเพียงการเยี่ยมชม ดู และทำสำเนาของเนื้อหาในแต่ละหน้าของเว็บไซต์นี้ และ\
			หรือดาวน์โหลดโบรชัวร์ผลิตภัณฑ์ใดๆได้เพียง 1 สำเนาเท่านั้น คู่มือการใช้งานสำหรับผู้ใช้ และ/หรือซอฟท์แวร์ที่มีนำเสนออยู่บนเว็บไซต์นี้จะ\
			ต้องเป็นไปเพื่อการใช้งาน ส่วนตัว ไม่เกี่ยวข้องกับการค้าหรือผลกำไร และใช้กับคอมพิวเตอร์ส่วนตัวเท่านั้น คุณไม่สามารถทำซ้ำ ตีพิมพ์ ดัดแปลง\
			หรือเผยแพร่ข้อมูลเนื้อหาต่างๆที่ปรากฎอยู่บนเว็บไซต์ คุณจะต้อง ดูแลและไม่เปลี่ยนแปลงเนื้อหาดั้งเดิมที่ได้เป็นลิขสิทธิ์ตามกฎหมาย หรือข้อมูลอื่นใด\
			ที่มีเจ้าของหรือประกาศต่างๆที่มีข้อมูลเนื้อหา โบรชัวร์ผลิตภัณฑ์ คู่มือการใช้งาน และ/หรือซอฟท์แวร์ต่างๆ ห้ามมิให้ผู้ใดนำข้อมูลเนื้อหาต่างๆ\
			โบรชัวร์ผลิตภัณฑ์ และ/หรือซอฟท์แวร์ต่างๆ ไปใช้ประโยชน์นอกเหนือจากที่กำหนดไว้ข้างต้นโดยเด็ดขาดซอฟท์แวร์ที่มีอยู่บนเว็บไซต์นี้\
			ได้รับการคุ้มครองดูแลโดยข้อกำหนดตามที่ ระบุในใบอนุญาติของผู้ใช้งานปลายทาง ซึ่งคุณจำเป็นที่จะต้องยอมรับและแสดงความยินยอมก่อน\
			ที่จะทำการดาวน์โหลดและ ติดตั้งซอฟท์แวร์ดังกล่าว',

			'termTwo': 'ข้อมูลเนื้อหาทั้งหมดรวมถึงซอฟท์แวร์ทุกรายการที่ปรากฎอยู่บนเว็บไซต์ นี้นั้นแสดง “ตามที่เป็น และ “ เท่าที่มีอยู่ ณ ขณะนั้น” \
			บราเดอร์สงวนสิทธ์ในความรับผิดชอบใดๆ ในข้อมูลเนื้อหาต่างๆ รวมถึงซอฟท์แวร์และในบางกรณีอาจหมายรวมถึงบริการต่างๆที่ มีอยู่บนเว็บไซต์\
			ในความถูกต้อง ครบถ้วนสมบูรณ์ เป็นปัจจุบัน ทันเหตุการณ์ เชื่อถือได้ในความปลอดภัย ปราศจากไวรัสหรือสิ่งที่เป็นอันตราย รวมถึงการใช้งานเนื้อ\
			หาข้อมูลดังที่ กล่าวมารวมถึงซอฟท์แวร์ในแง่ของความถูกต้อง สมบูรณ์แบบ ปลอดภัย เชื่อถือไว้วางใจได้ บราเดอร์สงวนสิทธ์ในความรับผิดชอบหาก\
			เกิดความเสียหายในทุกกรณี ครอบคลุมถึงการสูญเสียรายได้/ผลกำไร การสูญหายของข้อมูล การสูญหายหรือสิ่งของถูกทำลาย และ/หรือการสูญเสียที่\
			เป็นผลมาจากการใช้งานหรือความเชื่อถือในข้อมูลเนื้อหา หรือซอฟท์แวร์ที่ปรากฎอยู่บนเว็บไซต์นี้',

			'termThree': 'เนื้อหาทั้งหมดที่ปรากฎบนเว็บไซต์และข้อมูลรวมถึงซอฟท์แวร์ทุกรายการ ที่มีให้บริการอบู่บนเว็บไซต์นี้ (รวมทั้งแต่ไม่จำกัดถึง\
				ข้อความทั้งหมด กราฟิค อาร์ตเวิร์ค เสียง สคริปต์ สัญญลักษณ์ รูปภาพ และรูปถ่าย โบรชัวร์ผลิตภัณฑ์ คู่มือการใช้งาน\
				และไดรฟ์เวอร์ของซอฟท์แวร์) ได้รับการคุ้มครองดูแลโดยกฎหมายลิขสิทธิ์ การทำซ้ำ ผลิตขึ้นใหม่ การบันทึก การพิมพ์ซ้ำ\
				อัพโหลด โพสต์ ส่ง เผยแพร่ข้อมูลในทุกช่องทาง ไม่ว่าจะเป็นทั้งหมดหรือบางส่วนไม่ว่าจะอยู่ในรูปแบบใดหรือสื่อชนิดใด\
				 นำไปใช้ในงานอื่นใด หรือนำเนื้อหาข้อมูลดังกล่าวที่มีลิขสิทธิ์โดยปราศจากการชี้แจงให้เจ้าของ ลิขสิทธิ์ได้ทราบเป็นลายลักษณ์อักษรหรือ\
				 ไม่ได้รับการอนุมัติก่อนจะถือเป็น การละเมิดสิทธิดังกล่าวคำว่า “บราเดอร์” และโลโก้ของ “บราเดอร์” ที่ปรากฎอยู่บนเว็บไซต์นี้คือ\
				 เครื่องหมายการค้าของบราเดอร์ การนำเครื่องหมายการค้าดังที่กล่าวมาไปใช้โดยไม่ได้รับอนุญาติจะถือเป็นการ ละเมิดเครื่องหมายการ\
				 ค้าและ/หรือจัดเป็นการลวงขายในรูปแบบหนึ่ง',

			'termFour': 'เรามีการจัดทำไฮเปอร์ลิงค์บนเว็บไซต์นี้เพื่อการเชื่อมต่อไปยัง เว็บไซต์ข้างนอกเพื่ออำนวยความสะดวกตามที่เห็นสมควร\
			และการรวบรวมไฮเปอร์ลิงค์มานำเสนอบนเว็บไซต์นี้ ไม่ได้หมายความถึงการตัวแทนของเว็บไซต์นั้นๆ ไฮเปอร์ลิงค์ของเว็บไซต์ภายนอกไม่\
			ได้อยู่ภายใต้การควบคุมดูแลของบราเดอร์ และบราเดอร์ขอสงวนสิทธ์ในความรับผิดชอบในกรณีที่คุณเข้าชมเว็บไซต์ภายนอกผ่านทาง\
			 เว็บไซต์ของเรา จะต้องยอมรับความ เสี่ยงทั้งหมดที่อาจเกิดขึ้นเอง',

			'termFive': 'ข้อกำหนดและเงื่อนไขข้างต้นได้รับการปกครองดูแลภายใต้กฎหมายของประเทศไทย\
			ศาลของประเทศไทยจึงมีขอบเขตอำนาจสูงสุดเกี่ยวกับการดำเนินการตามกฎหมายต่างๆ',

			'termSix': `1.รายการส่งเสริมการขายนี้มีผลเฉพาะการซื้อ-ขายภายในประเทศไทยเท่า นั้น พนักงานและสมาชิกครอบครัวสายตรงของพนักงาน บริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัดและบริษัทตัวแทน (รวมถึงแต่ไม่จำกัดครอบคลุมถึงตัวแทนจำหน่ายของบราเดอร์) ที่มีความเกี่ยวข้องกับรายการส่งเสริมการขายนี้จะไม่มีสิทธิเข้าร่วมใน รายการส่งเสริมการขายนี้\<br><br>
2. การใช้สิทธินั้นจะขึ้นอยู่กับเหตุผลและการตรวจสอบเอกสารหลักฐานว่าเป็นความ จริงโดยบริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัด ลูกค้าจึงได้รับคำแนะนำให้เก็บฉบับสำเนาของเอกสารทั้งหมดที่ได้ส่งให้กับเรา ในเรื่องการใช้สิทธิ การใช้สิทธิจะได้รับการปฏิเสธหากบริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัด ไม่สามารถพิสูจน์ความจริงได้ บริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัด ขอสงวนสิทธิในการดำเนินคดีกับผู้ที่ใช้สิทธิในทางมิชอบหรือฉ้อโกง\<br><br>
3. บริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัด ไม่รับผิดชอบในกรณีที่ใช้สิทธิโดยการส่งโทรสารแล้วเกิดความล่าช้า สูญหาย หรือไม่ชัดเจน\<br><br>
4. ในการเข้าร่วมรายการส่งเสริมการขาย หรือไม่มิฉะนั้นหากลูกค้าได้รับคำแนะนำใดๆในเรื่องรายการส่งเสริมการขาย ลูกค้าแต่ละคนจะต้องยินยอมให้ข้อมูลที่ส่งให้กับเราในช่วงต้นที่เข้าร่วม รายการส่งเสริมการขายถูกนำไปเก็บไว้ในฐานข้อมูล โดยบริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัด อาจนำข้อมูลไปใช้ในสื่อที่เกี่ยวข้องกับรายการส่งเสริมการขายที่จะมีขึ้นใน อนาคต รวมถึงนำไปใช้เพื่อวัตถุประสงค์ทางการตลาดและเพื่อเผยแพร่สู่สาธาณชนโดย ปราศจากการอ้างอิงเพิ่มเติมหรือการจ่ายหรือการชดเชยให้แก่ผู้เข้าร่วมรายการ ข้อมูลส่วนตัวของผู้เข้าร่วมรายการจะถูกเก็บรักษาไว้ที่สำนักงานของบริษัท บราเดอร์ คอมเมอร์เชี่ยล (ประเทศไทย) จำกัด\<br><br>
5.บราเดอร์จะไม่รับผิดชอบในส่วนของการสูญหายหรือถูกทำลายซึ่งได้รับ ผลกระทบ (รวมถึงแต่ไม่จำกัดในส่วนของการสูญหายทางอ้อมหรือผลที่เกิดขึ้นจากการสูญ หาย), สำหรับการบาดเจ็บในรายบุคคลหรือการช่วยเหลือ ซึ่งเป็นผลมาจากการเข้าร่วมในรายการส่งเสริมการขาย ยกเว้น เป็นความรับผิดชอบซึ่งไม่สามารถแยกออกได้ตามกฎหมาย\<br><br>
6. การเข้าร่วมรายการส่งเสริมการขายจะไม่สามารถทำได้ ในกรณีที่เลขหมายประจำเครื่องของผลิตภัณฑ์ได้เคยผ่านการใช้สิทธิแลกรับของ รางวัลมาแล้วมากกว่า 1 ครั้ง\<br><br>
7. การใช้สิทธิแลกรับของกำนัลไม่สามารถใช้ได้กับคำสั่งซื้อที่ค้างอยู่ บราเดอร์ขอสงวนสิทธิในการปฏิเสธการขอใช้สิทธิดังกล่าวหากผลิตภัณฑ์นั้นมีการ ส่งกลับคืน\<br><br>
8. รายการส่งเสริมการขายนี้ไม่สามารถนำไปรวมกับข้อเสนอของรายการส่งเสริมการขายอื่นๆได้\<br><br>
9.การใช้สิทธิแลกรับของกำนัลที่ล่าช้าจะไม่ได้รับการพิจารณา<br>`,
		};
	}

	get_translation(key: string) {
		if (this.translations[key]) {
			return this.translations[key];
		}
	}

	get_term_All(key: string) {
		if (this.termAll[key]) {
			return this.termAll[key];
		}
	}

	get_term_condition(key: string) {
		if (this.terms_conditions[key]) {
			return this.terms_conditions[key];
		}
	}

	trackComponents(key: string) {
		return this.track[key];
	}

	


	initialize() {
		
	}

	isLoading() {
		return this.storage.get('track');
	}

	

}
