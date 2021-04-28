import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {COURSES, findLessonsForCourse, LESSONS} from "../../../../server/db-data";
import {saveCourse} from "../../../../server/save-course.route";
import {Course} from "../model/course";
import {HttpErrorResponse} from "@angular/common/http";

describe('Courses Service', () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService,
        HttpClientTestingModule
      ]
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {
        expect(courses).toBeTruthy('No courses returned!');
        expect(courses.length).toEqual(12, 'incorrect number of courses');

        const course = courses.find(course => course.id === 12);

        expect(course.titles.description).toEqual('Angular Testing Course');
      });

    const req = httpTestingController.expectOne('/api/courses');

    req.flush({
      payload: Object.values(COURSES)
    });
  });

  it('should check findAllCourses method request method', () => {
    coursesService.findAllCourses()
      .subscribe();

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
  });

  it('should retrieve no courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {
        expect(courses.length).toEqual(0, 'incorrect number of courses');
      });

    const req = httpTestingController.expectOne('/api/courses');

    req.flush({
      payload: []
    });

  });

  it('should find course by id', () => {
    coursesService.findCourseById(12)
      .subscribe(
        (course) => {
          expect(course.id).toEqual(12);
        });

    const req = httpTestingController.expectOne('/api/courses/12');
    req.flush(COURSES[12]);


  });

  it('should save the course', () => {
    const changes: Partial<Course> = {
      titles: {
        description: 'Testing Course'
      }
    };

    coursesService.saveCourse(12, changes)
      .subscribe(
        course => {
          expect(course.titles.description).toEqual('Testing Course');
        });

    const req = httpTestingController.expectOne('/api/courses/12');
    req.flush({
      ...COURSES[12],
      ...changes
    });

  });

  it('should return an error id saveCourses fails', () => {
    const changes: Partial<Course> = {
      titles: {
        description: 'Testing Course'
      }
    };

    coursesService.saveCourse(12, changes)
      .subscribe(
          () => fail('the save course operation should fail'),
            (error: HttpErrorResponse) => {
            expect(error.status).toBe(500);
          }
        );

    const req = httpTestingController.expectOne('/api/courses/12');
    req.flush('save course failed', {
      status: 500, statusText: 'Internal Server Error'
    })
  });

  it('should find list of lessons', () => {

    coursesService.findLessons(12)
      .subscribe(
        lessons => {
           //expect(lessons).toBeTruthy();
           expect(lessons.length).toBe(3);
        });

    const req = httpTestingController.expectOne(req => req.url == '/api/lessons');
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');
    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
