var idl = `interface AnimationTimeline {
    readonly attribute double? currentTime;
};

[Constructor (DOMHighResTimeStamp originTime)]
interface DocumentTimeline : AnimationTimeline {
};

[Constructor (optional AnimationEffectReadOnly? effect = null,
              optional AnimationTimeline? timeline = null)]
interface Animation : EventTarget {
             attribute DOMString                id;
             attribute AnimationEffectReadOnly? effect;
             attribute AnimationTimeline?       timeline;
             attribute double?                  startTime;
             attribute double?                  currentTime;
             attribute double                   playbackRate;
    readonly attribute AnimationPlayState       playState;
    readonly attribute Promise<Animation>       ready;
    readonly attribute Promise<Animation>       finished;
             attribute EventHandler             onfinish;
             attribute EventHandler             oncancel;
    void cancel ();
    void finish ();
    void play ();
    void pause ();
    void reverse ();
};

enum AnimationPlayState { "idle", "pending", "running", "paused", "finished" };

interface AnimationEffectReadOnly {
    readonly attribute AnimationEffectTimingReadOnly timing;
    ComputedTimingProperties getComputedTiming();
};

interface AnimationEffectTimingReadOnly {
    readonly attribute double                             delay;
    readonly attribute double                             endDelay;
    readonly attribute FillMode                           fill;
    readonly attribute double                             iterationStart;
    readonly attribute unrestricted double                iterations;
    readonly attribute (unrestricted double or DOMString) duration;
    readonly attribute PlaybackDirection                  direction;
    readonly attribute DOMString                          easing;
};

interface AnimationEffectTiming : AnimationEffectTimingReadOnly {
    inherit attribute double                             delay;
    inherit attribute double                             endDelay;
    inherit attribute FillMode                           fill;
    inherit attribute double                             iterationStart;
    inherit attribute unrestricted double                iterations;
    inherit attribute (unrestricted double or DOMString) duration;
    inherit attribute PlaybackDirection                  direction;
    inherit attribute DOMString                          easing;
};

dictionary AnimationEffectTimingProperties {
    double                             delay = 0;
    double                             endDelay = 0;
    FillMode                           fill = "auto";
    double                             iterationStart = 0.0;
    unrestricted double                iterations = 1.0;
    (unrestricted double or DOMString) duration = "auto";
    PlaybackDirection                  direction = "normal";
    DOMString                          easing = "linear";
};

dictionary ComputedTimingProperties : AnimationEffectTimingProperties {
    unrestricted double  endTime;
    unrestricted double  activeDuration;
    double?              localTime;
    unrestricted double? progress;
    unrestricted double? currentIteration;
};

enum FillMode { "none", "forwards", "backwards", "both", "auto" };

enum PlaybackDirection { "normal", "reverse", "alternate", "alternate-reverse" };

[Constructor (Animatable? target,
              object? frames,
              optional (unrestricted double or KeyframeEffectOptions) options)]
interface KeyframeEffectReadOnly : AnimationEffectReadOnly {
    readonly attribute Animatable?                 target;
    readonly attribute IterationCompositeOperation iterationComposite;
    readonly attribute CompositeOperation          composite;
    readonly attribute DOMString                   spacing;
    KeyframeEffect   clone ();
    sequence<object> getFrames ();
};

[Constructor (Animatable? target,
              object? frames,
              optional (unrestricted double or KeyframeEffectOptions) options)]
interface KeyframeEffect : KeyframeEffectReadOnly {
    inherit attribute Animatable?                 target;
    inherit attribute IterationCompositeOperation iterationComposite;
    inherit attribute CompositeOperation          composite;
    inherit attribute DOMString                   spacing;
    void setFrames (object? frames);
};

dictionary BaseComputedKeyframe {
     double?            offset = null;
     double             computedOffset;
     DOMString          easing = "linear";
     CompositeOperation composite;
};

dictionary BasePropertyIndexedKeyframe {
    DOMString          easing = "linear";
    CompositeOperation composite;
};

dictionary BaseKeyframe {
    double?            offset = null;
    DOMString          easing = "linear";
    CompositeOperation composite;
};

dictionary KeyframeEffectOptions : AnimationEffectTimingProperties {
    IterationCompositeOperation iterationComposite = "replace";
    CompositeOperation          composite = "replace";
    DOMString                   spacing = "distribute";
};

enum IterationCompositeOperation {"replace", "accumulate"};

enum CompositeOperation {"replace", "add", "accumulate"};

[Constructor (object? frames)]
interface SharedKeyframeList {
};

[NoInterfaceObject]
interface Animatable {
    Animation           animate (object? frames,
                                 optional (unrestricted double or KeyframeAnimationOptions) options);
    sequence<Animation> getAnimations ();
};
dictionary KeyframeAnimationOptions : KeyframeEffectOptions {
    DOMString id = "";
};

partial interface Document {
    readonly attribute DocumentTimeline timeline;
    sequence<Animation> getAnimations();
};

Element implements Animatable;

CSSPseudoElement implements Animatable;

[Constructor (DOMString type, optional AnimationPlaybackEventInit eventInitDict)]
interface AnimationPlaybackEvent : Event {
    readonly attribute double? currentTime;
    readonly attribute double? timelineTime;
};
dictionary AnimationPlaybackEventInit : EventInit {
    double? currentTime = null;
    double? timelineTime = null;
};
`;
