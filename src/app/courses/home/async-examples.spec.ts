import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

describe('Async test examples', () => {


  it('Asynchronous test example with Jasmine done', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;

      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchronous test example - setTimeout()", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
    }, 1000);

    flush();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    let test = false;

    console.log('Creating Promise');

    Promise.resolve().then(() => {
      console.log('Promise is executed!');
      test = true;
    });

    flushMicrotasks();

    expect(test).toEqual(true);
  }));

  it("Asynchronous test example - plain Promise + setTimeout()", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(
      () => {
        counter += 10;

        setTimeout(() => {
          counter += 1;
        }, 1000);
      }
    );


    flushMicrotasks();
    flush();

    expect(counter).toEqual(11);

  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;

    console.log('Creating Observables');
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    expect(test).toEqual(true);

  }));

    it('Asynchronous test example - Observables sync', async () => {
    let test = false;

    console.log('Creating Observables');
    const test$ = of(test);

    test$.subscribe(() => {
      test = true;

    });

    expect(test).toEqual(true);
  });
});
