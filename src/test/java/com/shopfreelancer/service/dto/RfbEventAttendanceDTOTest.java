package com.shopfreelancer.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.shopfreelancer.web.rest.TestUtil;

public class RfbEventAttendanceDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RfbEventAttendanceDTO.class);
        RfbEventAttendanceDTO rfbEventAttendanceDTO1 = new RfbEventAttendanceDTO();
        rfbEventAttendanceDTO1.setId(1L);
        RfbEventAttendanceDTO rfbEventAttendanceDTO2 = new RfbEventAttendanceDTO();
        assertThat(rfbEventAttendanceDTO1).isNotEqualTo(rfbEventAttendanceDTO2);
        rfbEventAttendanceDTO2.setId(rfbEventAttendanceDTO1.getId());
        assertThat(rfbEventAttendanceDTO1).isEqualTo(rfbEventAttendanceDTO2);
        rfbEventAttendanceDTO2.setId(2L);
        assertThat(rfbEventAttendanceDTO1).isNotEqualTo(rfbEventAttendanceDTO2);
        rfbEventAttendanceDTO1.setId(null);
        assertThat(rfbEventAttendanceDTO1).isNotEqualTo(rfbEventAttendanceDTO2);
    }
}
