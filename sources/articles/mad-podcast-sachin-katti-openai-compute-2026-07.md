# MAD Podcast × Sachin Katti (OpenAI 산업 컴퓨트 총괄) — "We Can't Build Fast Enough" (2026-07)

**수집일**: 2026-08-06
**원문**: [YouTube — OpenAI's Compute Chief: We Can't Build Fast Enough | Sachin Katti](https://www.youtube.com/watch?v=wEZBlmvxx4o) (발행 2026-07 중순, 파리 RAISE 컨퍼런스 현장 녹음)
**프로그램**: The MAD Podcast with Matt Turck (FirstMark Capital)
**인물**: Sachin Katti — OpenAI Head of Industrial Compute. 스탠퍼드 교수(2010~, CS/EE — 네트워킹·광 네트워크)·복수 창업(마지막 스타트업 VMware 인수)·직전 Intel CTO
**수집 방법**: 사용자 제공 **트랜스크립트 전문(1차 자료)** — 유튜브 자동 캡션 기반 원문을 부록에 그대로 보존. 요약·번역은 수집자 작성

---

## 핵심 요약 (한국어)

### 1. 수요·공급 — "수요가 공급을 압도, 온라인되는 즉시 소진"

- **"수요가 컴퓨트 공급을 압도적으로 앞선다(Demand far outstrips compute supply). 온라인으로 가져오는 모든 컴퓨트를 즉시 소비한다"** — OpenAI 기준 낭비되는 컴퓨트 없음.
- **컴퓨트 3배 = 매출 3배**: "컴퓨트를 3배 늘리면 매출이 3배 늘었다. 역사가 이를 증명해왔다" — 컴퓨트-매출 결합 계수를 1차 당사자가 직접 확인.
- **최대 리스크는 과잉이 아니라 과소 건설**: "충분하다고 생각해 속도를 늦출 때마다 항상 부정적으로 놀랐다 — 늦추지 말았어야 했다." 향후 3년의 서프라이즈는 "지을 수 있는 양이 수요에 못 미치는" 방향이라는 것.
- **물리 세계의 속도 한계**: "우리가 컴퓨트를 확보·건설하려는 스케일에서 물리 세계는 그렇게 빨리 움직이지 않는다" — 공급망·공장은 캐파를 그 속도로 못 늘림.

### 2. 지출 규모

- **OpenAI 올해 컴퓨트 지출 ~$50B** ("directionally right" 확인), **업계 전체 올해 ~$700B** — 위키 기존 수집(빅테크 2026 CapEx ~$700~725B)과 정합. 최근 조달 "$122B" 언급(진행자 발화).

### 3. 추론·학습 구분의 소멸 + AI 재귀

- **추론이 컴퓨트의 과반**일 수 있으나, "학습과 추론을 구분하지 않는다 — **학습의 상당 부분이 이제 추론**이다"(합성 데이터 생성·포스트트레이닝·테스트타임 컴퓨트 전부 추론).
- **AI가 AI 연구를 수행**: 과거 실험 수는 희소한 인간 연구자 수에 묶였으나, 이제 AI가 연구를 수행하며 실험 수·연구용 컴퓨트 수요가 폭발. **"AI가 다음 세대 AI를 학습·구동할 시스템(칩 포함)을 설계하는 재귀(recursion)의 세계가 멀지 않다."**

### 4. 데이터센터의 실체 — "전자를 토큰으로 바꾸는 공장"

- 대형 축구장 크기·**전면 액체냉각**(칩·데이터홀·케이블·변압기까지 — "에너지를 처리하는 모든 것이 열을 낸다").
- **냉각↔성능 직결**: "칩을 더 뜨겁게 돌릴수록 더 많은 **메모리 대역폭**과 FLOPS를 얻는다" — 냉각 효율이 곧 인텔리전스 생산량.
- 물 소비는 폐루프 재활용으로 미미(브라운아웃 우려는 오해라고 반박).
- 사이트 선정 4요소: 부지·인허가·전력(그리드+가스)·건설 인력.

### 5. 전력 — 그리드 투자·비하인드 더 미터·원자력

- 원칙: **"그리드에서 전력을 빼앗지 않는다"** — 데이터센터를 지을 때마다 신규 발전(가스·태양광·수력)+송전·변압기·변전소 투자를 직접 자금 지원. "이 데이터센터들이 아니었으면 자금이 붙지 않았을 인프라 — 미국(과 세계)의 그리드가 빠르게 업그레이드되는 부수 효과."
- 그리드 한계에 도달한 곳은 **비하인드 더 미터(behind-the-meter) 자가발전** — 현재는 가스터빈(미국서 가장 밀도 높고 수송 가능하며 가용).
- **원자력: "빨리 올수록 좋다(can't come soon enough)"** — 가장 밀도 높고 클린한 에너지원, 데이터센터의 대규모 확장 에너지원으로 중요해질 것.

### 6. Jalapeño — 자체 추론 칩 (9개월 설계→테이프아웃)

- 전략 논지: **워크로드(모델)를 아는 자가 칩을 코디자인** — "최종 워크로드와 모델을 알기에 설계 결정을 단축(short circuit)할 수 있다."
- **최적화 지표 = 와트당 토큰(tokens per watt)** — "세계가 전력에 제약된 오늘, 같은 전력으로 더 많은 토큰을 만드는 것이 모두에게 낫다."
- 9개월 만에 설계→테이프아웃(커리어 최속): ① 전 Google TPU 설계진 ② **Broadcom 파트너십** ③ 워크로드를 아는 고객=설계자 ④ **AI 자신이 칩 설계·최적화를 보조** — 사람 시간에 묶였던 반복을 AI가 가속.

### 7. Stargate·조달 포트폴리오·재무 구조

- **Stargate = OpenAI 컴퓨트 전략의 우산 개념**으로 진화(오라클·소프트뱅크 JV → 전방위 전략). 소프트뱅크 에너지와 웜셸 공동 설계, 자체 칩 운영 학습 지속.
- **포트폴리오 접근**: 하이퍼스케일러(Microsoft·AWS·Google — 과반)+뉴클라우드(CoreWeave)+칩 파트너 직공급(Cerebras)+디자인빌드 파트너+잠재적 자체 건설. "한 바구니에 담지 않는다."
- Abilene(오라클) GB 클러스터에서 **최신 모델 학습 중**. 오라클이 미시간·텍사스 등에 추가 DC 건설 중(2~3년 내 온라인).
- **재무 구조: OpenAI는 오프테이커(테넌트)** — 소유·파이낸싱은 파트너(MS·구글·아마존·오라클) 몫. 컴퓨트 구매를 커밋하는 구조.

### 8. 보장 캐파(Guaranteed Capacity) = 보장 토큰

- **"보장 캐파는 보장 토큰이다"** — 일정 달러어치 인텔리전스(토큰)를 보장. "컴퓨트 부족 세계에서 토큰은 항상 프리미엄 — 엔터프라이즈의 필수 투입재가 된 인텔리전스의 공급 보증." **인텔리전스가 모든 디지털 엔터프라이즈의 공급 단위(supply unit)가 되고 있다.**

### 9. 병목 — "어디에나 있다"

- 진행자가 메모리 병목을 직접 질문 → **"병목은 공급망 어디에나 있다(bottlenecks everywhere)"**: 인허가, **가스터빈·변압기**(지난 10년 증설 없던 산업이 수요 충격 — 캐파 추가에 수년), **전기공·배관공 등 숙련 인력** 부족(하이퍼스케일러·랩 전부가 채용 경쟁).
- MRC: 10만 GPU급 패브릭에서 장애를 우회하는 **멀티패스 스프레잉 네트워킹 프로토콜** — 신뢰성·가용성 확보.

### 10. 우주 데이터센터

- 엔지니어링 문제로서 해결 가능·"오비탈 컴퓨트의 자리는 있다"(전체 해결책은 아니고 보완재). 관건은 **발사 경제성·하드웨어 경제성의 변곡점** — 싸게 쏘아올리고 고장 나면 싸게 버릴 수 있어야.

---

## 위키 함의 (수집자 요약)

1. **DF1(AI 수요) 상방 1차 확인**: 최대 구매자(OpenAI 컴퓨트 총괄)가 "수요≫공급·즉시 소진·컴퓨트 3배=매출 3배·과소 건설이 최대 리스크"를 직접 발언 — 이창수 "시가 시장"·수요 사슬 분석과 정합하는 1차 자료.
2. **AI 재귀 논지**: AI가 AI 연구·칩 설계를 수행 → 연구용 컴퓨트 수요 폭발 — 수요 지속성의 새 상방 메커니즘(권석준 "추론 100배"와 별개 축).
3. **메모리 접점**: "칩을 뜨겁게 돌릴수록 메모리 대역폭↑"(냉각-메모리 성능 결합), Jalapeño "와트당 토큰" 최적화 — 전력 제약 시대에 메모리 대역폭·용량 효율이 칩 설계의 핵심 변수. 커스텀 ASIC(Broadcom)+HBM 어태치 흐름은 이창수 "브로드컴·ASIC 생태계 재편" 발언과 수렴.
4. **보장 토큰 = 계약 진화의 다음 층위**: Spot→LTA→SCA(메모리 층위) 위에 **토큰 층위의 보장 계약**이 등장 — 인텔리전스의 유틸리티화. 수요 사슬(프론티어→CSP→메모리)의 최상류가 자신의 하류(엔터프라이즈)에 공급 보증을 파는 구조.
5. **병목 확인**: 가스터빈·변압기·숙련 인력 — 위키 bottleneck-model-2030·에너지 제약 페이지의 제약 축을 1차 당사자가 확인. 단 메모리를 특정 병목으로 단언하지 않고 "어디에나"로 답한 점 유의.
6. **오프테이커 재무 구조**: OpenAI는 소유 없이 구매 커밋(테넌트) — 메모리 업체 입장에서 최종 수요자의 신용·커밋 구조 파악에 중요(중복 수요 리스크 평가의 입력).

---

## 부록 — 원문 트랜스크립트 전문 (영어, 유튜브 자동 캡션 기반·불변 보존)

Anytime we have thought we have had
enough compute, we can slow down. Always
negatively surprises like
we should not have slowed down. Demand
far outstrips compute supply today. So,
anything we can bring online we consume
immediately. Our biggest worry is that
still. At the scale at which we are
trying to get compute and build compute,
the physical world does not move that
fast. We do believe that the world of
recursion is not that far where AI will
design the systems it needs to train and
run the next generation of AI including
chips.
Hi, I'm Matt Turk. Welcome to the Matt
Podcast. My guest today is Sachin Katti
who holds what might be the most
fascinating and relevant title in tech
right now, Head of Industrial Compute at
OpenAI. Sachin has an incredible
background. He was a professor at
Stanford, a multi-time founder, and most
recently the CTO at Intel. Now, he's
leading what many are calling the
largest infrastructure build out in the
human history. In this episode, we step
away from the model layer and dive deep
into compute and the physical reality of
the AI boom. We talk about the
staggering scale of the data centers
being built. We get into the weeds on
liquid-cooled supercomputers, power
[music] grid constraints, the potential
of nuclear energy, and OpenAI's move
into custom silicon with jalapeno. We
also discuss the broader start strategy
and the slightly sober reality that AI
is now beginning to help design its own
chips. It is a fantastic look behind the
curtain at what it actually takes to
power the future of intelligence. Please
enjoy my conversation with Sachin Katti.
All right, Sachin, welcome. Uh excited
to do this. Uh we are recording this on
the sidelines of the Race conference in
Paris. Uh so, thank you for braving the
the heat.
Yeah.
Uh it's another heatwave here.
Thank you. Great to be here. Great to be
here.
To start, some people describe what's
currently happening in the world of
compute data centers as the largest
infrastructure build out in history,
bigger than uh the highway, uh bigger
than the railroads. And I'm I'm curious
one, if you agree, and and two, what it
feels like on from the inside. Like
what's How do you view what you're
currently building at OpenAI?
Yeah, it definitely feels like one of
the largest things humanity has ever
built, effectively.
Definitely bigger than many of the
things that I've heard of. I'm not old
enough to have experienced the highway
buildout. But
no, it's
feels exactly like what it sounds I'm in
the in the belly of the beast, so to
speak. Every day is
we are making we are making decisions.
We are compute that historically from my
previous role, for example, at Intel,
we'd probably take months to make given
the magnitude of the those decisions.
But the demand is so insatiable
that and it is growing so rapidly
that we have to move very quickly. So
it's an it's an intense time, but it's
probably the most exciting thing an
engineer would want to be part of.
Yeah, and I read somewhere that OpenAI
was planning on spending about 50
billion compute this year. Is that Is
that still the rough number
directionally?
It actually that sounds about right.
Yeah, and the whole industry itself was
going to be 700 billion in
compute spend this year as well. So like
insane insane numbers.
It seems.
Yeah, and it's probably continuing to
grow, right? And a lot of build
happening. So a lot of that is also
going to translate to compute usage from
people like us in a year or two.
Is the right way to think about this
that
for OpenAI it's
it's a bit of a new world, right?
There's
obviously not quite a a because
obviously the all AI research is going
you know full speed ahead but like
building
a whole new business within the the the
company. Is that Is that fair? Is that
how people think about it? Because
obviously building models is one thing,
building data centers is a whole
different world.
Yeah, I mean I think OpenAI has always
has had a fundamental belief that
computers are the foundation of
everything, right? Computers are the
foundation for intelligence. And the way
we keep continuing to scale intelligence
and distribute intelligence is by having
compute.
And so that has never been different.
That has never always been the belief.
I think what's becoming clear is to
build the kind of compute we need and
and at the scale
we have to not just rely on getting
compute from our partners. We
increasingly have to take a much more
active role in building and getting that
compute that we need.
So it does absolutely feel like a new
muscle that we're building in the
company.
And
maybe to anchor the the conversation
from from from the beginning,
it would actually be very helpful to
talk about what a data center
is in reality.
So I think like everybody knows that
data centers are being built but you
know going to one's head like I'm not
sure that everybody could say well what
is actually being built because we've
been building data centers over the
industry for cloud for for decades at
this point. So what is fundamentally
different and new about the data centers
that we're building for AI today?
I think the biggest probably is is a
scale, right? So we are
essentially building large
supercomputers as we think about AI.
And as we build intelligence and deliver
intelligence and models become more
capable, we use it for more more and
more complex tasks. We need more and
more bigger computers effectively. And
so I think the way we visualize data
centers is
giant factories, right? That are turning
uh electrons into tokens. Uh that's a
popular phrase nowadays. But that it's
it actually has a lot of a ring of truth
to it. So, how do we take power? How do
we take those electrons and actually use
it to power chips that effectively are
delivering intelligence?
Uh
but the way I visualize it is large
football fields,
uh liquid cooled because these chips run
really hot.
Uh the temperatures on these chips are
very very high. And so you have to cool
them with liquids. You can't cool them
with air. So, a lot of liquid cooled uh
basically refrigerators effectively uh
that are sitting in the alongside the
building.
And you know, on that a big wall where
it's uh the the the cooling happens at
the data center level or does it happen
at the chip level? Or both?
Both. Right. So, you need to cool the
data halls, but you also need to need to
cool the chips individually because it's
not going to be enough to do one or the
other.
[snorts]
And uh you also have to cool the things
that connect chips, right? And so that's
why you need cooling pretty much
everywhere uh nowadays.
Even the cables that are the
transformers that distribute the power
become too hot. So, they also need to be
cooled. So, everything that processes
energy produces heat.
And is cooling technology uh that's
being used uh something that's uh well
understood and is just getting deployed
or is there like fundamental new things
happening in cooling right now?
I think liquid cooling has been around
for some time uh but has never been
deployed at this scale. And so, the
innovation is more around how to make it
reliable, how to make it uh
cheaper, uh more scalable, right? So,
there's a lot of innovation around that.
There's also a lot of new innovation,
new kinds of liquids, new kinds of
materials that can absorb heat better.
Uh because anything that can improve the
efficiency of heat transfer uh is very
important for data centers.
Mhm.
So, we can then run the chips hotter.
Mhm.
Right? And there is a direct correlation
between running a chip hotter and how
powerful the computer is.
So, the hotter the chip, the more memory
bandwidth you get, the more flops you
get. And so, there's more there's a
strong payoff.
Mhm.
If you can cool well, that also means
you can produce more intelligence.
All right. So, gigantic factories, lots
of cooling. Um the other part that uh
seems to me very critical to any
discussion is uh power and energy. Uh
so, how do how does that work starting
at a a high level? Uh you do you connect
to the grid? Do you have your own power
generation?
It I think the early days we all
connected to the grid.
Uh and we still all would want to
connect to the grid. Uh
at this point we are beginning to hit uh
and we are investing in generation
infrastructure for the grid,
transmission infrastructure for the
grid. So, whenever we build a data
center anywhere, we make it a hard
commitment that we are not taking power
away from the grid. In fact, we are
investing in the grid
to generate new power uh so that we can
consume it uh for data centers.
You know, what does that mean
practically?
You have a grid somewhere. Uh it produce
it has a certain generation and
distribution capability, certain number
of megawatts.
Uh obviously, a data center shows up. If
there are spare capacity, then of course
the data center can use it. But if there
isn't spare capacity, then we have to
add new gas or solar or hydro generation
infrastructure.
To the grid.
So, we are investing and funding that
build-out.
Mhm.
And then you have to build transmission
lines, invest in transformers,
substations to distribute that power.
Mhm.
So, wherever we're are data centers, we
are funding uh the development of all of
that infrastructure. And so, that's one
of the things that uh that we do want to
emphasize, which is
this is infrastructure that would
otherwise not have been funded hm if not
for these data centers. And one of the
side benefits of this big data center
build-out is
the grid infrastructure of America and
the whole world, for that matter, is
getting upgraded very quickly.
And so, that's the power piece. So,
whenever we can do that, we do that, and
we consume power from the grid, but it's
also being good citizens of the grid
because we are improving the
infrastructure for everyone.
Yeah.
Not just for data centers, but also for
households.
Uh in some places, we are beginning to
hit the limits of how much grid power we
can
build and consume. And so, there
everyone's looking at behind the meter.
We are also doing some behind the meter
generation, where we would have on-site
uh power generation and distribution
capability that did not come from the
grid, but in fact, the data center
becomes
effectively self-sufficient
Yeah.
in terms of power.
It does gas turbines?
Well, what what is it? Today, it's gas
turbines, especially in the US. Uh
because that's the most [clears throat]
dense, transportable form of energy, and
also the one
uh that is uh
quite uh you know, widely available in
the US.
Uh but there, we are talking about the
sub-mention.
Do you think that the nuclear
conversation is
uh interesting? Maybe we're recording
this in France, which has a bunch of uh
you know, nuclear nuclear uh power
generation. Nuclear systems have come
back to the discussion in the US, as
well. Is that something that you think
about? Do you think it's interesting?
Absolutely. It can't come soon enough.
Okay.
Uh I think it is the densest form of
energy we can all produce and consume.
Uh and it's also clean. So, I think
definitely uh would be a good source of
massive scalable energy for data
centers.
Obviously,
outside of France uh
the rest of the world has a lot of
catching up to do and building this
infrastructure, but I think it's going
to be a very important role in the data
center world.
Okay, so that's a great introduction on
on on data centers.
The other The other interesting bits of
news that you guys recently had is
jalapeno.
Mhm.
Um so now in for OpenAI in addition to
being the
application business, consumer and
enterprise, and then being in the model
AI research
business, and then the computing data
center business, it seems that OpenAI is
in the
uh chip business, if that's fair. So
like completely full stack, but I'm I'm
I'm curious and we'll we'll go into some
details about jalapeno later later, but
I just want to like overall strategy,
where where does that fit?
As we begin to as
so uh pretty big fraction of the world's
population,
AI usage is exploding.
Uh inference is obviously becoming a big
fraction of our workload, and it's
consuming a lot of compute. And one of
the other realizations is because we
know what is the workload exactly, what
is the model we want to run.
Uh we can co-design the hardware
to be super efficient and that are in
those models, right? And so the the
strategic thesis behind jalapeno is how
do we take advantage of knowing what the
end workload is, what the model itself
is, and design chips
uh that are very efficient in serving
those models.
So it really allows us to drive the
efficiency advantage, drive more tokens
per watt.
So the key metric that jalapeno is
optimizing is maximizing the number of
tokens you can produce per watt. This
And because the world is constrained by
power today, so the more tokens you can
produce for the same number of amount of
power, it's better for everyone. So we
look at it as a very critical ingredient
in scaling how we deliver intelligence
to the world.
Great. So we'll come back to Open AI in
in in a second, but you mentioned you
just mentioned inference and
uh
you know, there's such an interesting
evolution as well.
Without commenting on necessarily what's
going on at Open AI specifically,
is inference
equally being much bigger than training
these days in terms of like usage of
computers as as as are we shifted from
you know, being those very heavy
pre-training runs as the major use case
for compute to now just inference being
the majority?
No, inference is big,
perhaps even the majority on compute.
And and I think one of the I we don't
like to make a distinction between
training and inference because a lot of
training is now inference.
So when we train a new model, we are
generating synthetic data for example.
That's inference.
When we train a new model, we are doing
post-training and that's inference.
When you train a model, you're doing
test time compute. That's all inference.
So when we say training, a lot of the
compute actually is inference even in
that phase of the the work. So inference
is a fundamental building block.
Yeah. Obviously I cannot resist asking
the inevitable question around
the potential risk of overbuilding
given the lag between demand and usage
and how long it takes to build a data
center. And you mentioned
somewhere that you were deliberately
very paranoid about the problems
ahead in the next
three years. We're planning on that the
surprises ahead,
which seems like a very healthy
approach. So, how do you how do you
think about
that?
Is there any way to mitigate that or is
just like I'm going to be playing do you
have any belief that this is the future
and you know, we're just all just going
to go go go?
We have deep conviction in scaling,
right? And
history has borne us out. So,
effectively our revenue, for example,
has tracked it.
We triple compute and we triple revenue.
And we believe that I mean, that
continues to be true. Demand far
outstrips compute supply today.
So, anything we can bring online we
consume immediately. So, there's no
compute that is going waste as for us at
least.
So, I think that conviction has not
changed whatsoever. And if anything, we
are seeing
that scaling laws on research and
training
continue to hold and potentially
the pace at which we are doing research
is accelerating, right? Because of AI
itself. So, AI is doing a lot of AI
research now.
And so, one of the subtle implications
of that is
is previously our researchers used to
run experiments and they needed compute
to run experiments.
But the number of experiments they could
run was limited by the number of
human researchers they have, which is a
scarce resource in the world. Right?
There's not a lot of people who can do
AI research.
Now is AI itself can do AI research, the
number of experiments we can draw next
tools. And therefore, the amount of
compute you need for research also
explodes.
So, we don't see a world where
we will have unlimited compute for the
foreseeable future, right? When I was
referring to surprises, my worry is more
on the downside of we are not able to
actually build all the compute that you
want.
And and this is where is the other if
the other way for us. Right? And because
that is consistently in the case we
anytime we have thought we have having
less compute, we can slow down.
Always negatively surprises like, oh
we should not have slowed down.
Right? And and so our biggest worry is
that still.
And at the scale at which we are
planning to get compute and build
compute,
uh the physical world does not move that
fast. Right? Physical supply chains,
factories don't move that fast or cannot
add capacity that fast. So for us the
surprise is more on that direction than
the other direction.
That's fascinating. You alluded to
communities a minute ago and obviously
that's a that's a key debate. So curious
about your perspective on a
on a on a spectrum where um
you know, on the one hand one extreme
you'd say, well,
uh the
AI industry and computer industry has a
PR problem and there's no problem it's
just that the the problem is that we
cannot explain it well enough to at the
other extreme actually those communities
have a point.
Uh what do you think the reality is?
I think anytime there's new technology
which is as ex- as revolutionary as this
technology is,
uh there is always disruption that's
going to happen.
Uh but you know, that we have we have
learned this over history that
uh this always leads to better outcomes
for society, right? And so how do we
draw a line from where we are today to
that outcome, right? And uh explain to
the world why this is the trajectory we
all need to be on. I mean, it's our
responsibility to do that.
Uh
on the communities front there's a
little bit of a local versus global
issue, right? Uh the communities, I
think data centers are even today a net
positive to every community.
It is we are building these data centers
in rural areas of America for example,
right? Where there's nothing else that
is being built. I'm just kidding.
So we show up in rural Texas. We build a
data center
that produces new property taxes into
the community.
That funds schools, that funds
hospitals. We show up and we invest in
new grid infrastructure. Which otherwise
would never have happened. Because
there's no demand.
So there's a modernized grid that that
area can enjoy. Basically we produce
jobs. Nice. And and and so I think one
of the things we are investing a lot in
is explaining the local benefits every
time we build a data center somewhere.
And making sure that it is well
understood the kind of upside that this
has. And data centers, once they are
built,
are essentially very clean citizens.
Right? They don't produce any
gases or toxic chemicals or anything.
Right? They're self-contained.
They just produce intelligence.
Yeah. Typical question that comes up is
water.
Um and I think that's been debunked
quite a bit by by research, but well
it's maybe give us just color on um my
outlook on the the water question.
We use liquid cooled and the liquid is
recycled.
So we do actually the water consumption
of a data center is shockingly small
relative to household water consumption.
Uh so I think as you put it, it's been
debunked. It's uh it's a misperception
that data centers consume a lot of
water. Uh if anything, they consume so
little water for what they do. Uh and
all of that water is recycled. So we
don't net consume new water once we get
to a particular point. The water just
gets recycled as it is liquid cooled.
Yeah. So all those stories about like
brown water is that just don't make
sense because the water um at the data
center up it's in like a contained
circuit.
It's a closed loop. Yes, it's a closed
loop. It's a closed loop.
And by the way, you mentioned Texas in
rural areas. Since we talked about data
centers at the beginning of this
conversation,
why
do OpenAI and other companies pick rural
areas? Like how do you select a site for
a data center?
Uh so many factors. So one is of course
land, like plentiful land. Uh number two
would be uh permitting, like can we
build these things? And we want to build
these things such that they are uh not
affecting any
neighborhoods, right? So land that is
somewhat removed is the ideal candidate.
Of course, access to power, right? So a
strong grid,
[snorts]
strong gas availability. All of those
are important factors. And then four is
labor,
right? So how quickly can you build
these things? So availability of labor,
construction labor, qualified
electricians, plumbers, all this stuff
comes into play. So all of those factors
go into every single site selection
decision.
Um and I know we obviously Texas is a
popular because it fits a lot of these
criteria, but it's not the only state. I
mean, we have data centers all around
the country in LA plus.
Mhm. Okay, great. We're going to go into
all of this in in in more detail, but um
let's talk about
you a little bit and and and your
journey. So you're the the head of
industrial compute at
OpenAI,
uh which by the way to the beginning of
this conversation to the title
industrial compute is is so, I mean,
such a perfect title, right? For the
moment we're in. Um but uh what what
does that mean? What what what is the
role um
and how is this all effort organized
within OpenAI to the extent you can talk
about it?
Yeah, I I think think of it as uh my
role and our team's role rather
Uh
how do we
bring compute online at industrial
scale.
Right? That's effectively what we're
doing. Uh that's the entire life cycle.
So, how do we find the ingredients that
are going to compute, land, power,
shelves, chips, heat. How do we finance
them? Right? So, because these are
massive dollars. And so, how do we make
sure that we finance the
uh grid infrastructure? How do you
finance the construction of the
infrastructure? How do you finance the
chips?
Uh then it's about how do you
operationalize all of this? So, how do
you actually make sure these things
happen on time? They stay up. How do you
operationalize all of this
infrastructure? So, it's that entire
life cycle. And then, of course, uh
how do you actually use the compute? So,
big part of my role is uh capacity
allocation inside of an ear.
Mhm.
So, it is always a scarce resource.
You sound very You're a very popular
guy.
not very popular. Uh
there is always someone who is unhappy
with whatever decisions you make.
Uh but, yeah, we actually our team
provides the input to make the capacity
allocation decisions.
Mhm.
So, we surface what are the different
choice points and what are the what if
questions on different allocation
choices that we have. So, capacity
planning and then, of course, using that
to forecast
how much capacity we need where. Because
it's not just more compute, it's also
where, what kind, what shape, what chip,
uh what workload you want to run there.
So, all of those are this team figures
out kind of what should be the
forecasting and planning. And that
informs that closes the loop. And so,
that informs of where do I go find the
next
chunk of land and power and chips to put
in there.
And uh
again, without going into it, I think uh
confidential although I guess when you
guys go public, all of this will you
soon will all of this will be public,
but like is that thousands of people at
this stage? And like is that a
is is that a like multiple different
teams? Or do you guys got to like ask
yours, a bunch of things in works, or is
a bunch of contractors?
Uh it's a portfolio approach, right? So,
we are never going to be in a world
where we outsource everything or we let
everything outsource, right? It's always
going to be a mix because that's the
that's the reason that's the
reasonable thing to do, right? So, you
don't want to put your eggs in all all
in one basket. So, we will have
hyperscalers providing probably
providing a big chunk of a compute, a
majority of a compute.
Uh we will have new clouds uh parts of
our portfolio. Uh we will be partnering
with design build firms that can build
the compute that we need. And of course,
we may build some of it ourselves. And
and [snorts] so, we're always going to
have a portfolio approach because at the
scale which we need
uh we will need to tap into all sources
of compute. We can't just rely on one
particular mechanism.
And uh your background before all of
this uh so, you're both a uh professor
at Stanford and an entrepreneur or
founder or mostly an academic like just
walk us through your journey.
A bit of all of the above. Uh so, but
yes, uh I'm at my
heart, I'm an academic. So, I've been a
I'm professor at Stanford since 2010.
Uh recently
What do you focus on there?
Uh I was a faculty in computer science
and electrical engineering.
With a like a particular interest?
Uh yeah, my area of research was
networking and optical fiber networks
both mobile wireless networks and the
like. So, there's only networks
actually.
Okay.
Uh but three, four years ago, I while I
was at Stanford, I did a couple of
startups.
Uh
the last startup got acquired by VMware.
Uh and that's how got to know Pat. Uh,
Pat became Intel's CEO and he
That's how I ended up at Intel. Uh, most
recently before coming to Open AI, I was
Intel's CTO. And
uh, and so I've kind of seen all the
different things, academia, startups,
corporate
uh, in Intel. And then of course, a mix
of all of the above in Open AI because
they have a research lab,
uh, startup, and a fast-growing company
all mixed into one by Open AI.
Yes. Is that what you Why you said What
What did you say yes to the job when the
job came uh, come up?
Uh, it's actually what I just said. That
makes this so unique.
Uh, and it's hard to find anywhere,
right? Because you always have to
choose, but having a world-class
research environment
coupled with
the hardest technical problems. So, I
mean, we're building the largest
computer in the world. And so, there are
a lot of new problems that we would need
to solve.
But also a fast-growing business. So,
this makes us
I I'd like problems that sit at the
intersection of
business, technology, and strategies.
And so, this is like very unique time in
history and a unique role. Uh, so which
is very attractive, obviously.
Uh, very cool. All right. So, going into
a bit more specifics about um, Open AI's
compute strategy. Uh, so
maybe let's summarize what you guys
currently have. So, I think there's some
Microsoft uh, you did this big uh, $20
deal with uh, Cerebras. There's a bunch
of things going on. There's Stargate.
Maybe just give us the lay of the land
of what you currently have and then
we'll talk about what you what you're
building next.
Uh, we have compute
from effectively many sources. So,
Microsoft obviously is a big partner,
important partner.
Uh, we also have compute at the amounts
from AWS, ION, and Google.
So, we have compute from all of the
hyperscalers, effectively.
Um we also have compute from CoreWeave,
for example, so a new cloud. And then,
of course, compute uh that chip partners
are supplying now, like Cerebras, in the
top directly for any 26 compute for us.
So, I think that's the mix roughly
today.
Um oh, as we go forward, uh obviously,
we'll be building on all of these
relationships. Uh but, also looking at
more
options where we design the compute, the
data center itself ourselves, or
potentially even build a data center
ourselves.
Yeah.
So, all of those uh are ways of scaling
the amount of compute that we have.
Mhm.
Um so,
I think coming back to my earlier
answer,
it's the answer always will probably be
try, but it's all of the above. I'm with
you. [laughter]
Yeah. Yeah. Uh no, no, that that's
that's helpful. Uh and uh you know,
obviously, diversification makes all the
sense in the world, given the uh
scarcity. Um and then, uh it seems that
Stargate has evolved. So, from
uh the what was going to be a joint
venture with Oracle and uh SoftBank, um
to what now seems like it seems like
it's more like an umbrella term for the
compute strategy these days. Is that Is
that a fair way to describe it, or
Yeah. Yeah, I think uh we look at
Stargate as our compute strategy.
Yeah.
And it uh is varying degrees of uh us
designing or building the compute
ourselves. Uh for example, with uh with
Oracle close partnership, uh we help
them uh design, we help them uh with how
we do operate AI compute, which is
effectively new kind of compute uh for
us. Uh we work with SoftBank Energy,
which is public. Uh we basically have
co-designed the warm shell with them and
they're executing on that warm shells
and we will be kind of figuring out how
to operate our chips in these data
centers, ourselves, using our new chips.
So, Stargate to us is that umbrella
strategy for across all of these
different things. And think of it as an
evolution that we continuously be on
because it's never going to be tomorrow
we wake up wake up and do only one kind
of we are building it.
Yeah.
Uh, I've been Stargate to us is a
continuous way of learning
how to scale compute and we adding on
more and more capability.
And
as part of that there there are data
centers being built right now in like
Abilene, Texas and
so maybe walk us through that. What what
is currently being built for for people
to have a so situational awareness?
Uh, we obviously have a big partnership
with Oracle.
That's the Abilene data center. Uh,
that's where for example we are training
our newest models.
So, very excited about that. That's a
very big uh, GB black belt cluster
for for our needs.
Yeah. So, that's that's up and running.
It's up and running. It's being used for
training the last two models more at
your
Um, so it's
super trip.
Yeah.
A lot and you're seeing the results.
Like you're seeing how quickly the
models are becoming more capable.
Yeah.
It's because of these kinds of compute.
Yeah.
Are there data centers that are
currently being built that are Yes. That
are the right Yeah.
Yes. So, Oracle is building a number of
data centers all of which are public so
across Michigan and Texas and other
places. So, these are coming online in
the next couple of years
as they get built and being put whatever
chips on that time training rather than
but these are really meant to be uh
very big clusters
uh that Amel is new both uh training,
but also product inference kind of
compete.
Right. With the way those deals are
structured, the Oracle is the prime
building those
uh and
Oracle of the cloud.
Is it
And we're consuming company
so you're the core tenant from both the
Interesting.
How does the for the stuff that you're
building, how does the financing
strategy work? You know, obviously you
you you all raised what was it? The 122
billion was it the number um
recently, so there's no
uh shortage of cash, although, you know,
um given all those expenses, I don't
know, but um
uh
you know, the core resource of the world
are famous for uh being very strategic
users of debts. Um is that part of the
financing strategy as well? How do you
How do you all think about it?
I mean, uh with all of these
compute uh that we have today, uh
we have amazing partners who actually
are channeling that for us.
So, Microsoft, Google, Amazon, Oracle
are we are off the off-take. So, we are
the tenants, as you put it. So, we
commit to consuming that compute, to
buying that compute, whether it's online
Also, across the board, like everything
um you're
um cuz you you you're building stuff as
well.
So, you're building you the partners are
building
Partners somebody.
And you're always the across the board
the the tenants, not the owner at the
Correct.
Okay. So, therefore, uh financing is
outsourced to your partners. Okay. We
talked about the jalapeno, let this let
let's go into a bit more detail there um
cuz in particular, it seems that you
guys went incredibly quickly. And is
that anything that I I read somewhere in
9 months from design to tape out? So,
maybe maybe walk us through that and
what was the reason it went so quick?
Yes, it was incredibly [clears throat]
quick. 9 months is
very very fast, probably the fastest
I've seen in my career.
I think several reasons. One is uh
it it's a team, it's a strong team.
Uh they have many many of many of the
team have designed TPU chips at Google
in the past. So, very well experienced
team. We have a great partner in
Broadcom.
That have a very strong track record of
delivering get skills ASICs. So, I think
a strong partnership with Broadcom and
and making this happen.
Three, I think
perhaps
Open AI unique fund.
Uh
in most chip companies or when you
design chips, you don't know what you're
designing it for.
Because you are a vendor, the customer
who you eventually runs the workload is
someone different. Uh there's a unique
advantage here of us knowing what the
future models might look like and
therefore being able to short circuit a
lot of the decisions you need to make
design decisions you need to make on the
chip side. So, that that's super
helpful. And finally, increasingly AI
itself helping design and optimize the
chip.
That is usually the one that takes the
longest time because human you're
basically limited by how many human
human much human time is there
to process all this data and run the
experiments and we can do a lot of those
iterations much faster.
With AI?
Using AI.
Yeah. So, AI is building its own chips
now.
Yes. I think that world is not very far.
I mean, AI right now is assisting in
chip design. But we do believe that the
world of recursion is not that far where
AI will design the systems it needs to
train and run the next generation of AI.
And including chips.
Including chips.
Including chips. You also released a a
weeks ago
uh MRC, which is a networking protocol.
Uh walk us through through that. What is
it and why is it a big deal?
It's a new uh
networking
uh protocol routing technology, if you
will.
Uh uh uh
to
scale these really large cluster
fabrics. So, imagine you have
uh 100,000 GPUs.
Uh They need to be connected together.
And uh when you're doing large training
runs, uh they're constantly
communicating with each other because
these models are so large that the
processing of the models is happening
over the entire 100,000 GPU cluster, for
example.
And you can imagine imagine the number
of links and switches and NIC cards that
need to be there to connect all of these
chips together.
At this scale, failures are common.
Right? Happens all the time.
Uh you can't really even enumerate all
the ways things could fail.
So, the strategy behind MRC is how do
you design algorithms and protocols
that can gracefully
um mask all these failures and make sure
that the training workload
does not get impacted. Right? It just
The network is an abstracted system that
the training job does not ever worry.
It's always going to be there. It's
always going to find a path
even if a link fails. So, it is all
about reliability. It is all about
availability. So, how do we design
protocols that can tame the complexity
of such a such a big cluster
and make sure that we don't get stopped
because of failures, which are very
common in the system. So, MRC is like a
multi-path spraying protocol where you
can spray packets over multiple paths.
So, between any two chips, there are
many many routes to get there, kind of
like between any two points in the city
there are many routes.
So, instead of picking just one route,
we will we will send traffic across all
of them, and whichever one succeeds, you
take that.
Right? And so, that way even if any one
of them fails, it's not a showstopper.
So, that's kind of the basic intuition
behind it. It's obviously a lot more
sophisticated than that. But, doing this
at scale and that speed is hard, and so
that's why it's quite innovative.
What are the bottlenecks that you
experience these days? So, since like
the nature of the bottleneck keeps
changing in the computer industry, um
uh obviously people talk a lot about
memory these days. Is that Is that one
of them? Or what what else?
I think they're bottlenecks everywhere,
to be honest, to the supply chain. Uh
so, I don't think there's any one,
right? Uh
we have bottlenecks in
the data center building itself, around
permitting,
around availability of gas turbines,
transformers.
Those industries
capped
historically have not added much
capacity over the last decade or so ago,
and they've suddenly experienced a
demand shock.
Yeah.
And it takes years before you have
capacity to produce more turbines and
transformers. So, we're trying to play
catch-up.
And to the job thing that you that you
mentioned earlier, is there like a
shortage of like electricians and
and and my technical people trade people
that know how to build those things as
well? Is there a human
Absolutely.
Yeah.
Absolutely. So,
That's why we should all do uh
as AI replaces uh knowledge workers
become electricians.
No, I think there is a definitely a
shortage of electricians, plumbers, all
kinds of trades, you name it. So,
anything we can do to train more folks
to be able to do those They're a very
well-paying jobs
uh that a lot of us all of the
hyperscalers, all of the labs would
actively hiring for if you had the like
qualifications, so I think that is
definitely a bottleneck. I think they're
becoming an increasingly bottleneck
because we're all trying to build more
and more
and we have unlimited number of things
these capabilities.
Right. Let's talk for a minute about the
the business side of things. Another
thing you launched recently is
guaranteeing capacity for customers to
lock in compute.
Um
That which is interesting, right? It
almost feels like OpenAI is also
becoming a utility company providing
computing to others.
Uh uh
what's the story behind that and the the
strategy?
Yeah, so guaranteed capacity is
guaranteed tokens.
Right? So, we are effectively saying we
will guarantee you a certain dollars
worth of tokens of intelligence.
I I mean, it makes sense, right? So, in
a world where compute is a shortage,
therefore tokens are always going to be
at a premium. And there's a shortage of
tokens that we can produce even the
limited compute that we have. And as
this becomes a fundamental input to the
enterprise, right? So, enterprises are
going to need intelligence, more and
more of it to run.
Right? And so, this is a way of
enterprises gaining assurance that the
tokens of intelligence that they need
will be there for them. And so, they
they don't have to take business risk.
Right? And so, I I I think it's uh it's
good business hygiene.
If you have a critical supply
resource and every enterprise,
intelligence is kind of the most
important supply item, issue it.
Uh
it makes little sense to make sure you
secure that supply. And so, that's
that's the demand we're trying to
fulfill.
Yeah.
I know it's a new concept, like what
does it mean to have guaranteed capacity
for the intelligence? But I think that's
what intelligence is becoming. It is
becoming a supply unit for every digital
enterprise.
Right. So, maybe to end on a fun one,
uh,
and you can answer either with your open
eye hat on or not, uh,
data centers in space. Is that Is that,
uh, is that exciting? Is that science
fiction? Is that, uh, needed? Is it
something that people like to talk about
just because it's cool? Or where where
where do you land?
For for the geek in me and the engineer
in me, it's definitely exciting. It's,
uh, one of those things that can be
super cool to see a constellation of
satellites producing compute. Uh, I
actually think it is, uh, it will become
feasible, right? As engineering problems
we solve. Uh, but they can be solved,
uh, with enough time and investment.
Uh,
whether it is needed, uh, I think there
is room for orbital compute. Uh, I don't
think it's
going to solve all the compute needs,
but it's uh, definitely going to be a
complement in the arsenal.
I think what we are waiting for is when
does the economics of the launching
satellite
change? And when does the economics of
the hardware change? Because we need to
get to a point where it's cheap to
launch the hardware.
And if something fails, it's cheap to
throw it away. You I mean, you can't go
up and fix it. Uh, unlike on the ground.
Uh, and so I think that inflection point
hopefully happens soon and at that point
time it becomes viable.
Correct. So, Chirag has been a
wonderful. Thank you so much for
spending time with us. We appreciate it.
Thank you. It's been great to have have
this chat.
Cool.
Hi, it's Matt Turk again. Thanks for
listening to this episode of the Mad
Podcast. If you enjoyed it, we'd be very
grateful if you would consider
subscribing if you haven't already or
leaving a positive review or comment on
whichever platform you're watching this
or listening to this episode from. This
really helps us build a podcast and get
great guests. Thanks and see you on the
next episode.