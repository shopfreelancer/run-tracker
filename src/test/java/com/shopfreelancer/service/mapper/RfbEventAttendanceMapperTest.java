package com.shopfreelancer.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class RfbEventAttendanceMapperTest {

    private RfbEventAttendanceMapper rfbEventAttendanceMapper;

    @BeforeEach
    public void setUp() {
        rfbEventAttendanceMapper = new RfbEventAttendanceMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(rfbEventAttendanceMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(rfbEventAttendanceMapper.fromId(null)).isNull();
    }
}
