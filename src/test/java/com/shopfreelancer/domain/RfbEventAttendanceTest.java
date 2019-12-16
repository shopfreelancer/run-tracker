package com.shopfreelancer.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.shopfreelancer.web.rest.TestUtil;

public class RfbEventAttendanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfbEventAttendance.class);
        RfbEventAttendance rfbEventAttendance1 = new RfbEventAttendance();
        rfbEventAttendance1.setId(1L);
        RfbEventAttendance rfbEventAttendance2 = new RfbEventAttendance();
        rfbEventAttendance2.setId(rfbEventAttendance1.getId());
        assertThat(rfbEventAttendance1).isEqualTo(rfbEventAttendance2);
        rfbEventAttendance2.setId(2L);
        assertThat(rfbEventAttendance1).isNotEqualTo(rfbEventAttendance2);
        rfbEventAttendance1.setId(null);
        assertThat(rfbEventAttendance1).isNotEqualTo(rfbEventAttendance2);
    }
}
