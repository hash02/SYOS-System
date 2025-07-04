# DriftDetector.py
# Detects and logs symbolic or logical drift in recursive agent structures

class DriftDetector:
    def __init__(self, anchors):
        self.anchors = anchors

    def detect(self, input_text):
        drift_signals = [anchor for anchor in self.anchors if anchor not in input_text]
        if drift_signals:
            return f"[DriftDetector] Drift detected. Missing anchors: {drift_signals}"
        return "[DriftDetector] No symbolic drift detected."

# Example
if __name__ == "__main__":
    detector = DriftDetector(anchors=["truth", "origin", "anchor"])
    print(detector.detect("We must return to our origin and truth"))
