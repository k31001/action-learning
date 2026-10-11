// 내레이션 큐 표 — 단일 소스. scripts/tts.py 가 각 큐를 public/vo/<id>.wav 로 합성하고 길이를 vo-durations.json 에 쓴다.
// 화면 이벤트는 큐 시작 프레임에 묶인다(예: 낙폭 도장 = 해당 숫자를 읽는 큐의 시작). 문장은 짧게 끊어 큐 단위로 박자를 잡는다.
// 근거: wiki/downturn/downturn-history.md · scenario-matrix.md · sources/articles/dt-*-signals-2026-08-28.md
import durations from './vo-durations.json';

export type Cue = { id: string; text: string };
export const CUES: Record<string, Cue[]> = {
  open: [
    { id: 'o1', text: '지난 이십 년, 메모리에는 네 번의 겨울이 왔습니다.' },
  ],
  curve: [
    { id: 'c1', text: '그때마다, 매출은 무너졌습니다.' },
    { id: 'c2', text: '이십육 퍼센트.' },
    { id: 'c3', text: '십구 퍼센트.' },
    { id: 'c4', text: '삼십사 퍼센트.' },
    { id: 'c5', text: '그리고, 사십오 퍼센트.' },
    { id: 'c6', text: '겨울은 갈수록 깊어졌습니다.' },
  ],
  w08: [
    { id: 'a1', text: '이천팔 년. 치킨게임, 그리고 금융위기.' },
    { id: 'a2', text: '가격은 구십삼 퍼센트 폭락했고, 키몬다는 파산했습니다.' },
    { id: 'a3', text: '삼성은 생산을 줄이지 않고, 버텼습니다.' },
  ],
  w12: [
    { id: 'b1', text: '이천십이 년. 엘피다가 무너졌습니다.' },
    { id: 'b2', text: '여섯 회사는, 셋이 됐습니다.' },
    { id: 'b3', text: '삼성은 라인 십육을 돌리며, 남았습니다.' },
  ],
  w19: [
    { id: 'd1', text: '이천십구 년. 경쟁사들은 생산을 줄였습니다.' },
    { id: 'd2', text: '삼성은, 멈추지 않았습니다.' },
    { id: 'd3', text: '일 년 뒤, 점유율 사십사 점 일 퍼센트.' },
  ],
  w23: [
    { id: 'e1', text: '이천이십삼 년. 반년을, 일시적이라 믿었습니다.' },
    { id: 'e2', text: '매출은 세 분기 만에, 육십이 퍼센트 증발했고,' },
    { id: 'e3', text: '적자는 사상 최대, 십사 조 원을 넘었습니다.' },
    { id: 'e4', text: '한 박자, 늦었습니다.' },
  ],
  spring: [
    { id: 'p1', text: '그리고 에이아이가, 봄을 불렀습니다.' },
    { id: 'p2', text: '시장은 사상 최대로 돌아왔지만,' },
    { id: 'p3', text: '에이치비엠의 봄은, 먼저 준비한 쪽의 몫이었습니다.' },
  ],
  lesson: [
    { id: 'l1', text: '승부는 겨울에, 무엇을 심었느냐에서 갈렸습니다.' },
    { id: 'l2', text: '공정과 라인을 심었고,' },
    { id: 'l3', text: '에이치비엠 전담팀은, 줄였습니다.' },
  ],
  scen: [
    { id: 's0', text: '다음 겨울은, 어디서 올까요.' },
    { id: 's1', text: '수요발. 에이아이 투자가 멈추거나, 효율이 수요를 줄이는 겨울. 사십사 퍼센트.' },
    { id: 's2', text: '공급발. 공장이 한꺼번에 돌고, 중국산이 가격을 끌어내리는 겨울. 사십팔 퍼센트.' },
    { id: 's3', text: '전환발. 제품의 정의가 바뀌는 겨울, 팔 퍼센트.' },
  ],
  end: [
    { id: 'z1', text: '겨울은, 다시 옵니다.' },
    { id: 'z2', text: '지금, 무엇을 심을 것인가.' },
  ],
};

// 실측 길이(초). 합성 전에는 음절 수로 추정(6.5음절/초 + 쉼표당 0.2초 + 0.3초 여유)
const measured = durations as Record<string, number>;
export const voSec = (c: Cue) => measured[c.id] ?? c.text.replace(/[^가-힣a-zA-Z0-9]/g, '').length / 6.5 + (c.text.match(/[,.]/g)?.length ?? 0) * 0.2 + 0.3;
export const VO_MEASURED = Object.keys(measured).length > 0;
