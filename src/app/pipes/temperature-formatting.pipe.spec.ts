import {TemperatureFormattingPipe} from "./temperature-formatting.pipe";
import {TestBed} from "@angular/core/testing";

describe('TemperatureFormattingPipe', () => {
  let pipe: TemperatureFormattingPipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureFormattingPipe],
    });

    pipe = TestBed.inject(TemperatureFormattingPipe);
  });

  it('should transform input temperature and add symbol º', function () {
    expect(pipe.transform(-7.8)).toEqual('-8º');
    expect(pipe.transform(18.4)).toEqual('+18º');
    expect(pipe.transform(null)).toEqual('');
  });
})
